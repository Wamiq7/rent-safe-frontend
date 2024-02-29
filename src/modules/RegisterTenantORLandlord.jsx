import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Stepper from '../components/form/register/Stepper';
import StepperControl from '../components/form/register/StepperControl';
import { UseContextProvider } from '../components/form/register/StepperContext';
import FormContainer from '../components/form/FormContainer';
import organization from '../../public/organization.svg';
import { loadingContext } from '../components/context/LoadingState';
import Details from '../components/form/register/organization/Details';
import ABI from '../../../rent-safe-backend/artifacts/contracts/RegistrationContract.sol/RegistrationContract.json'
import { ethers } from 'ethers';

function RegisterTenantORLandlord(props) {
  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;
  const contractAddress = '0xfF21627553Fd92153b7501a5d868F7eEfa0F8392';


  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    cnic: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (name) => {
    if (name.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, name: "" }));
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

    if (field === "name") {
      validateName(value);
    }
    if (field === "cnic") {
      validatecnic(value);
    }
  };

  const steps = ['Personal Details'];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Details
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
            updateFormValue={updateFormValue}
          />
        );
    }
  };

  const requiredFields = ['name', 'cnic'];

  const handleClick = async (direction) => {
    let newStep = currentStep;

    // and when back button is not clicked otherwise even for back button click, network calls will be made.
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
        // setShowModal(!showModal);
        return;
      }

      if (isSubmitting) {
        return; // Prevent submitting multiple times while the request is being made
      }

      setIsSubmitting(true); // Disable the button

      const bodyData = new FormData();

      await setProgress(15);

      bodyData.append("name", formData.name);
      bodyData.append('cnic', formData.cnic);


      await setProgress(30);
    }
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
    await setProgress(50)

    try {
      const tx = await contract.registerUser(formData.name, formData.cnic, props.role, "");
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
      await setProgress(0);
    }
  };

  return (
    <div>
      {/* Stepper */}
      <FormContainer image={organization}>
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

export default RegisterTenantORLandlord;
