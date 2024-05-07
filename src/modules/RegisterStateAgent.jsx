import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Stepper from '../components/form/register/Stepper';
import StepperControl from '../components/form/register/StepperControl';
import { UseContextProvider } from '../components/form/register/StepperContext';
import StateAgentDetails from '../components/form/register/developer/StateAgentDetails';
import FormContainer from '../components/form/FormContainer';
import developer from "../../public/developer.svg";
import { loadingContext } from '../components/context/LoadingState';
import ABI from '../../../rent-safe-backend/artifacts/contracts/RegistrationContract.sol/RegistrationContract.json'
import { ethers } from 'ethers';
import axios from 'axios';

function RegisterStateAgent() {
  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;
  const contractAddress = '0xfF21627553Fd92153b7501a5d868F7eEfa0F8392';
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fname: '',
    estateName: '',
    cnic: '',
    phone: '',
    email: '',
    profilePic: '',
    cnicPic: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    fname: '',
    estateName: '',
    cnic: '',
    phone: '',
    email: '',
    profilePic: '',
    cnicPic: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field, value) => {
    if (!value) {
      setValidationErrors(prev => ({ ...prev, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` }));
    } else {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEmailChange = (email) => {
    if (!email) {
      setValidationErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setValidationErrors(prev => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setValidationErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const updateFormValue = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
    if (field === "cnic") {
      validatecnic(value);
    }
    else if (field === "fname") {
      validateFname(value);
    }
    else if (field === "estateName") {
      validateestateName(value);
    }
    else if (field === 'email') {
      handleEmailChange(value);
    }
  };

  const steps = ['Personal Details'];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <StateAgentDetails
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
            updateFormValue={updateFormValue}
          />
        );

    }
  };

  // for not letting the form proceed ahead without these fields being filled
  const requiredFields = ['fname', 'cnic', 'estateName','phone','email','profilePic','cnicPic'];
  const uploadToPinata = async (file) => {
    const fileData = new FormData();
    fileData.append("file", file);
    try {
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading file to Pinata:", error);
      toast.error("Error uploading file to IPFS.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
      });
      return null;
    }
  };


  const handleClick = async (direction) => {


    let newStep = currentStep;

    if (newStep === steps.length && direction !== "back") {
      // always start the loader with 0
      await setProgress(0);
      await setProgress(10);

      // return those fields from formData which are empty.
      const emptyFields = requiredFields.filter((field) => !formData[field]);
      if (emptyFields.length > 0) {
        // map through each item and make a new array
        const emptyFieldNames = emptyFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));

        const errorMessage = `Please fill in the following required fields: ${emptyFieldNames.join(', ')}`;
        toast.error(`${errorMessage}`, {
          position: toast.POSITION.TOP_CENTER, autoClose: 10000,
        });
        return;
      }

      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      const bodyData = new FormData();

      await setProgress(30);

      bodyData.append('fname', formData.fname);
      bodyData.append('estateName', formData.estateName);
      bodyData.append('cnic', formData.cnic);
      const uploads = [];
      if (formData.profilePic) uploads.push(uploadToPinata(formData.profilePic));
      if (formData.cnicPic) uploads.push(uploadToPinata(formData.cnicPic));

      const ipfsHashes = await Promise.all(uploads);
      bodyData.append('profileHash', ipfsHashes[0])
      bodyData.append('cnicHash', ipfsHashes[1])
      console.log(bodyData);

      console.log(bodyData.get('fname'), bodyData.get('cnic'), 0, bodyData.get('estateName'), bodyData.get('cnicHash'), bodyData.get('profileHash'));
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
      await setProgress(50)

      try {
        const tx = await contract.registerUser(bodyData.get('fname'), bodyData.get('cnic'), 0, bodyData.get('estateName'), bodyData.get('cnicHash'), bodyData.get('profileHash'));
        await setProgress(70);
        const receipt = await tx.wait();
        console.log("Transaction hash:", receipt.transactionHash);
        await setProgress(100);
        if (receipt) {
          navigate('/login')
          toast.success("User Registered Successfully");
        }
      } catch (error) {
        console.error("Error calling contract:", error);
        if (error.message.includes("CNIC already registered")) {
          toast.error("CNIC already registered");
        }
        if (error.message.includes("User already registered")) {
          toast.error("User already registered");
        }

        await setProgress(100);
      }
    }
  };

  return (
    <div>
      {/* Stepper */}
      <FormContainer image={developer}>
        <div className="relative h-full w-full">
          <div className="w-full h-full relative">
            <Stepper
              steps={steps}
              currentStep={currentStep}
            />
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
          {/* navigation button */}
          <div className=" w-full absolute bottom-0">
            {/* {currentStep !== steps.length && ( */}
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
              isSubmitting={isSubmitting}
            />
            {/* )} */}
          </div>
        </div>
      </FormContainer>
    </div>
  );
}

export default RegisterStateAgent;
