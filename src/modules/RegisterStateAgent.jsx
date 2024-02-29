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
  });
  const [validationErrors, setValidationErrors] = useState({
    fname: '',
    estateName: '',
    cnic: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFname = (name) => {
    if (name.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "" }));
    } else if (!name) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "Name is required" }));
    } else if (name.length < 3) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "Name must be atleast 3 characters long." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "" }));
    }
  };
  const validateestateName = (name) => {
    if (name.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, estateName: "" }));
    } else if (!name) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, estateName: "Estate name is required" }));
    } else if (name.length < 2) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, estateName: "Estate name must be atleast 2 characters long." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, estateName: "" }));
    }
  };
  const validatecnic = (cnic) => {
    if (cnic.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, cnic: "" }));
    } else if (!cnic) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, cnic: "CNIC is required" }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, cnic: "" }));
    }
  };

  const updateFormValue = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (field === "cnic") {
      validatecnic(value);
    }
    else if (field === "fname") {
      validateFname(value);
    }
    else if (field === "estateName") {
      validateestateName(value);
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
  const requiredFields = ['fname', 'cnic', 'estateName'];

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

    }
    console.log(formData);
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    await setProgress(50)

    try {
      const tx = await contract.registerUser(formData.fname, formData.cnic, 0, formData.estateName);
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
