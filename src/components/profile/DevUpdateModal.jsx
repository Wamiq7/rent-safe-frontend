// import { useEffect, useState } from 'react';
import { useContext, useRef, useState } from "react";
import { LuEdit } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { toast } from 'react-toastify';
import { loadingContext } from "../context/LoadingState";

function DevUpdateModal({ developer, fetchProfile }) {
  // need to make a local copy of the state came from parent component
  // because the update in original state using onChange handler was causing unnessary change in original state before saving it up through the PATCH request.
  const [localDev, setLocalDev] = useState(developer);
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const [validationErrors, setValidationErrors] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    technical_role: '',
    qualification: '',
    skills: "",
    photo: null,
    openToWork: false,
    linkedin: "",
    github: "",
    about: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFname = (name) => {
    if (name.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "" }));
    } else if (!name) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "Firt name is required" }));
    } else if (name.length < 3) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "First name must be atleast 3 characters long." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, fname: "" }));
    }
  };
  const validateLname = (name) => {
    if (name.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, lname: "" }));
    } else if (!name) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, lname: "Last name is required" }));
    } else if (name.length < 2) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, lname: "Last name must be atleast 2 characters long." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, lname: "" }));
    }
  };
  const validateEmail = (email) => {
    if (email.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    } else if (!email) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address" }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };
  const validatePassword = (password) => {
    if (password.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    } else if (!password) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "Password is required" }));
    } else if (password.length < 8) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 8 characters long." }));
    } else if (password.length > 16) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "Password must not exceed 16 characters." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };
  const validatePhone = (phone) => {
    if (phone.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    } else if (!phone) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, phone: "Phone number is required" }));
    // eslint-disable-next-line no-useless-escape
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      .test(phone)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, phone: "Please enter a valid phone number" }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }
  };
  const validateSkills = (skills) => {
    if (skills.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, skills: "" }));
    } else if (!/^([a-zA-Z.]+, )*[a-zA-Z.]+$/.test(skills)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, skills: "Please provide a valid input with space comma separation." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, skills: "" }));
    }
  };
  const validateLinkedin = (linkedin) => {
    if (linkedin.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, linkedin: "" }));
    } else if (!/^(https?:\/\/(www\.)?|http:\/\/(www\.)?)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(linkedin)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, linkedin: "Please provide a valid URL." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, linkedin: "" }));
    }
  };
  const validateGithub = (github) => {
    if (github.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, github: "" }));
    } else if (!/^(https?:\/\/(www\.)?|http:\/\/(www\.)?)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(github)) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, github: "Please provide a valid URL." }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, github: "" }));
    }
  };

  const updateFormValue = (field, value) => {
    setLocalDev({ ...localDev, [field]: value });

    if (field === "email") {
      validateEmail(value);
    } else if (field === "password") {
      validatePassword(value);
    } else if (field === "fname") {
      validateFname(value);
    } else if (field === "lname") {
      validateLname(value);
    } else if (field === "phone") {
      validatePhone(value);
    } else if (field === "skills") {
      validateSkills(value);
    } else if (field === "linkedin") {
      validateLinkedin(value);
    } else if (field === "github") {
      validateGithub(value);
    }
  };

  const progressState = useContext(loadingContext);
  const { setProgress } = progressState;
  const uid = localStorage.getItem("dev_uid");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSkills = (event) => {
    const { name, value } = event.target;
    setLocalDev({
      ...localDev,
      [name]: name === "skills" ? value.split(", ") : value,
    });
    validateSkills(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setLocalDev({ ...localDev, photo: file });
  };

  const handleModalClose = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal) {
      modal.close();
    }
  };

  const requiredFields = ['fname', 'lname', 'email', 'phone'];

  const handleUpdate = async (event) => {
    if (validationErrors.fname || validationErrors.lname || validationErrors.email || validationErrors.password || validationErrors.phone || validationErrors.skills || validationErrors.linkedin || validationErrors.github) {
      toast.error('Please correct the input errors before proceeding ahead.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
        style: { zIndex: 9999 }, // Adjust the value as needed
      });
      // alert("Validation erros");
      return;
    }

    // return those fields from formData which are empty.
    const emptyFields = requiredFields.filter((field) => !localDev[field]);
    if (emptyFields.length > 0) {
      // map through each item and make a new array
      const emptyFieldNames = emptyFields.map((field) => field.charAt(0).toUpperCase() + field.slice(1));

      const errorMessage = `Please fill in the following required fields: ${emptyFieldNames.join(', ')}`;
      toast.error(`${errorMessage}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
        style: { zIndex: 9999 }, // Adjust the value as needed
      });
      // setShowModal(!showModal);
      return;
    }

    if (isSubmitting) {
      return; // Prevent submitting multiple times while the request is being made
    }

    setIsSubmitting(true); // Disable the button

    await setProgress(0);
    await setProgress(10);
    event.preventDefault();
    const bodyData = new FormData();
    bodyData.append('fname', localDev.fname);
    bodyData.append('lname', localDev.lname);
    bodyData.append('email', localDev.email);
    bodyData.append('phone', localDev.phone);
    if (localDev.qualification) {
      bodyData.append('qualification', localDev.qualification);
    }
    if (localDev.skills) {
      // localDev.skills is already an array which is handled by handleSkills onChange method
      // so just appending each array element to a separate form-data key as sending array in form-data type is tricky
      localDev.skills.forEach((skill) => {
        bodyData.append('skills', skill);
      });
    }
    if (localDev.city) {
      bodyData.append('city', localDev.city);
    }
    if (localDev.technical_role) {
      bodyData.append('technical_role', localDev.technical_role);
    }
    if (localDev.openToWork) {
      bodyData.append('openToWork', localDev.openToWork);
    }
    if (localDev.linkedin) {
      bodyData.append('linkedin', localDev.linkedin);
    }
    if (localDev.github) {
      bodyData.append('github', localDev.github);
    }
    if (localDev.about) {
      bodyData.append('about', localDev.about);
    }
    if (localDev.photo) {
      bodyData.append('photo', localDev.photo);
    }
    await setProgress(30);
    fetch(`${import.meta.env.VITE_API_URL}/developers/${uid}`, {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
      body: bodyData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        await setProgress(50);
        // console.log('POSTED --> ', data);
        // alert(`${data.message}`);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_CENTER, autoClose: 2000,
        });
        fetchProfile();
        await setProgress(80);
        handleModalClose();
        await setProgress(100);
      })
      .catch(async (error) => {
        await setProgress(100);
        handleModalClose();
        toast.error(`${error}`, {
          position: toast.POSITION.TOP_CENTER, autoClose: 2000,
        });
      })
      .finally(() => {
        setIsSubmitting(false); // Enable the button again after request completion
      });
  };
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button
        type="button"
        className="btn"
        onClick={() => window.my_modal_2.showModal()}
      >
        <LuEdit className="absolute right-8 top-9 text-2xl text-accent hover:bg-accent/10 " />
      </button>
      <dialog id="my_modal_2" className="modal p-4 bg-transparent">
        <form method="dialog" className="modal-box  bg-white rounded-2xl p-10">
          <h1 className="flex items-center justify-center w-full text-2xl font-semibold border-b pb-4 text-slate-800">
            Update Profile
          </h1>
          <div className="w-full my-6 mr-0 ml-0 relative space-y-8 h-[60vh] overflow-y-scroll scroll-smooth z-10 scrollbar px-3">
            <div className="flex flex-auto gap-5 w-full items-center justify-between">
              <div className="relative w-full  pt-3">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                  First Name
                </p>
                <input
                  placeholder="John"
                  type="text"
                  value={localDev.fname}
                  onChange={(event) => updateFormValue("fname", event.target.value)}
                  className={`border capitalize placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.fname ? 'focus:border-red-500 border-red-300' : ''}`}
                />
                {validationErrors.fname && (
                <p className="text-red-500">{validationErrors.fname}</p>
                )}
              </div>
              <div className="relative w-full">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                  Last Name
                </p>
                <input
                  placeholder="Doe"
                  type="text"
                  value={localDev.lname}
                  onChange={(event) => updateFormValue("lname", event.target.value)}
                  className={`border capitalize placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.lname ? 'focus:border-red-500 border-red-300' : ''}`}
                />
                {validationErrors.lname && (
                <p className="text-red-500">{validationErrors.lname}</p>
                )}

              </div>
            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                Email
              </p>
              <input
                placeholder="johndoe@example.com"
                type="text"
                value={localDev.email}
                onChange={(event) => updateFormValue("email", event.target.value)}
                className={`border   placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md ${validationErrors.email ? 'focus:border-red-500 border-red-300' : ''}`}
              />
              {validationErrors.email && (
              <p className="text-red-500">{validationErrors.email}</p>
              )}

            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                Phone
              </p>
              <input
                placeholder="+91 84597 25190"
                type="phone"
                value={localDev.phone}
                onChange={(event) => updateFormValue("phone", event.target.value)}
                className={`border   placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md ${validationErrors.phone ? 'focus:border-red-500 border-red-300' : ''}`}
              />
              {validationErrors.phone && (
              <p className="text-red-500">{validationErrors.phone}</p>
              )}

            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                City
              </p>
              <input
                placeholder="Mumbai"
                type="text"
                value={localDev.city}
                onChange={(event) => setLocalDev({ ...localDev, city: event.target.value })}
                className="border   placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
              />
            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                Educational Qualification
              </p>
              <input
                placeholder="Full stack web developer"
                type="text"
                value={localDev.qualification}
                onChange={(event) => setLocalDev({
                  ...localDev,
                  qualification: event.target.value,
                })}
                className="border  placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
              />
            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                Technical Role
              </p>
              <input
                placeholder="Full stack web developer"
                type="text"
                value={localDev.technical_role}
                onChange={(event) => setLocalDev({
                  ...localDev,
                  technical_role: event.target.value,
                })}
                className="border   placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
              />
            </div>
            {/* ----------------Image Update-------------- */}
            <div className="relative">
              <div className="flex w-full justify-center">
                <div className="box-decoration w-full py-6">
                  <label
                    htmlFor="image-upload-input"
                    className="image-upload-label"
                  >
                    {image ? image.name : 'Choose an image'}

                    <div
                      role="button"
                      tabIndex={0}
                      //   onClick={handleClick}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleClick();
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {image ? (
                        <img
                          alt="Upload"
                          src={URL.createObjectURL(image)}
                          className="img-display-after"
                        />
                      ) : (
                        <RxAvatar className="w-40 h-40 text-accent" />
                      )}

                      <input
                        id="image-upload-input"
                        type="file"
                        onChange={handleImageChange}
                        ref={hiddenFileInput}
                        style={{ display: 'none' }}
                        accept="image/*"
                      />
                    </div>

                  </label>
                </div>
              </div>

            </div>
            <div className="relative">
              <p
                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
              >
                About
              </p>
              <textarea
                placeholder="About yourself..."
                type="text"
                value={localDev.about}
                onChange={(event) => setLocalDev({ ...localDev, about: event.target.value })}
                className="border placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
              />
            </div>
            <div className="relative">
              <p
                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
              >
                Skills
              </p>
              <input
                placeholder="Enter skills comma (,) separated.."
                type="text"
                value={localDev.skills.join(", ")}
                name="skills"
                onChange={handleSkills}
                className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.skills ? 'focus:border-red-500 border-red-300' : ''}`}
              />
              {validationErrors.skills && (
              <p className="text-red-500">{validationErrors.skills}</p>
              )}

            </div>
            <div className="relative">
              <p
                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
              >
                Linkedin Profile URL
              </p>
              <input
                placeholder="http://linkedin.com/...."
                type="text"
                value={localDev.linkedin}
                name="linkedin"
                onChange={(event) => updateFormValue("linkedin", event.target.value)}
                className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.linkedin ? 'focus:border-red-500 border-red-300' : ''}`}
              />
              {validationErrors.linkedin && (
              <p className="text-red-500">{validationErrors.linkedin}</p>
              )}

            </div>
            <div className="relative">
              <p
                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
              >
                Github Profile URL
              </p>
              <input
                placeholder="http://github.com/...."
                type="text"
                value={localDev.github}
                name="github"
                onChange={(event) => updateFormValue("github", event.target.value)}
                className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.github ? 'focus:border-red-500 border-red-300' : ''}`}
              />
              {validationErrors.github && (
              <p className="text-red-500">{validationErrors.github}</p>
              )}

            </div>
            <div className="mb-4">
              <label
                htmlFor="flexSwitchChecked"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Open to work ?
                <div className="form-control">
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchChecked"
                    checked={localDev.openToWork}
                    onChange={(e) => setLocalDev({
                      ...localDev,
                      openToWork: e.target.checked,
                    })}
                  />
                </div>
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => handleUpdate(e)}
            className={`cursor-pointer inline-block  pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg duration-200 hover:bg-indigo-600 ease w-full ${validationErrors.fname || validationErrors.lname || validationErrors.email || validationErrors.password || validationErrors.phone || validationErrors.skills || validationErrors.linkedin || validationErrors.github || isSubmitting ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : ''}`}
            disabled={validationErrors.fname || validationErrors.lname || validationErrors.email || validationErrors.password || validationErrors.phone || validationErrors.skills || validationErrors.linkedin || validationErrors.github || isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>
        <form method="dialog">
          <button type="button" className="modalbackdrop">
            close
          </button>
        </form>
      </dialog>
    </>
  );
}

export default DevUpdateModal;
