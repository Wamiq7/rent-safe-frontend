import React, { useRef, useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProjectAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    city: "",
    area:"",
    floor: "",
    owner_wallet: "",
    tenant_wallet: "",
    open: false,
    propertyStateAgent: localStorage.getItem("isOrg"),
    photo: null,
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hiddenFileInput = useRef(null);

  // console.log("Form data ---- ", formData);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setFormData({ ...formData, photo: file });
  };

  const patchORG = (projId, projMessage) => {
    fetch(`${import.meta.env.VITE_API_URL}/organizations/${localStorage.getItem("orgUID")}`)
      .then((response) => response.json())
      .then((orgData) => {
        // update the org_projects array with newly added project to that organization :
        const existingProjects = orgData.data.org_projects ? orgData.data.org_projects.map((project) => project._id) : [];
        const updatedProjects = [...existingProjects, projId];

        fetch(`${import.meta.env.VITE_API_URL}/organizations/${localStorage.getItem("orgUID")}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem("authToken"),
          },
          body: JSON.stringify({ org_projects: updatedProjects }),
        })
          .then((response) => response.json())
          .then((data) => {
            toast.success(`${projMessage} Also ${data.message}`, {
              position: toast.POSITION.TOP_CENTER, autoClose: 2000,
            });
            navigate("/");
          })
          .catch((error) => {
            console.log("Error updating organization : ", error);
          })
          .finally(() => {
            setIsSubmitting(false); // Enable the button again after request completion
          });
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ['address', 'description'];
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
    bodyData.append('address', formData.address);
    bodyData.append('description', formData.description);
    bodyData.append('propertyStateAgent', formData.propertyStateAgent);
    if (formData.city) {
      bodyData.append('city', formData.city);
    }
    if (formData.city) {
      bodyData.append('area', formData.area);
    }
    if (formData.floor) {
      bodyData.append('floor', formData.floor);
    }

    if (formData.owner_wallet) {
      bodyData.append('owner_wallet', formData.owner_wallet);
    }
    if (formData.tenant_wallet) {
      bodyData.append('tenant_wallet', formData.tenant_wallet);
    }
    if (formData.open) {
      bodyData.append('open', formData.open);
    }
    if (formData.photo) {
      bodyData.append('photo', formData.photo);
    }

    fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
      // body: JSON.stringify(formData),
      body: bodyData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // alerts_toast
          // alert(`${data.message}: ${data.error}`);
          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_CENTER, autoClose: 2000,
          });
        } else {
          patchORG(data.data._id, data.message);
          // alert(`${data.message}`);
        }
        // navigate("/");
      })
      .catch((error) => {
        console.log("Error posting the project : ", error);
      });
  };
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <div className="flex justify-center my-10 items-center h-screen">
      <div className="gradient z-0" />
      <div className="max-w-3xl z-10 w-full">
        <form
          className="bg-white/50 shadow-md px-8 pt-6 pb-8 mb-4 border z-10 border-slate-300 rounded-2xl py-5"
        >
          <h2
            className="text-gray-900 text-center text-2xl md:text-3xl mb-5 font-semibold"
          >
            Enter Property Details
          </h2>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 stext-sm font-bold mb-2"
            >
              Complete Property Address
              <input
                type="text"
                name="adress"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                id="address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Project address"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              City
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter area where property is located"
              />
            </label>
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="area"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Area
              <input
                type="text"
                name="area"
                id="area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter area where property is located"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="Floor"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Floor
              <input
                type="text"
                name="floor"
                id="floor"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ground,first,Second..etc"
              />
            </label>
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="board"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Project Board
              <select
                id="board"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.board}
                onChange={(e) => setFormData({ ...formData, board: e.target.value })}
              >
                <option
                  disabled
                  defaultValue
                >
                  Pick the suitable board
                </option>
                <option value="Scrum">Scrum</option>
                <option value="Agile">Agile</option>
                <option value="Kanban">Kanban</option>
              </select>
            </label>
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="owner_wallet"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Owner Wallet Address
              <input
                type="text"
                name="owner_wallet"
                id="owner_wallet"
                value={formData.owner_wallet}
                onChange={(e) => setFormData({ ...formData, owner_wallet: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Copy the property owner wallet address here"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tenant_wallet"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tenant Wallet Address
              <input
                type="text"
                name="tenant_wallet"
                id="tenant_wallet"
                value={formData.tenant_wallet}
                onChange={(e) => setFormData({ ...formData, tenant_wallet: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Copy the tenant wallet address here"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Property Description
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="No of rooms,facilities available...etc"
              />
            </label>
          </div>
          <div className="mb-4">
            {/* innline-block display is necessary for that clicking outside the input doesnt change the selection. */}
          
            <div className="relative">
              <p
                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
              >
                Upload Property Cover Photo
              </p>

              <div className="flex w-full justify-center my-4">
                <div className="box-decoration w-full py-6">
                  <label
                    htmlFor="image-upload-input"
                    className="image-upload-label"
                  >
                    {image ? image.name : 'Choose an image'}

                    <div
                      role="button"
                      tabIndex={0}
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
                          className="aspect-video md:w4 h-40 object-cover rounded-lg"
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
          </div>
          <div className="flex items-center justify-between glass">
            <button
              type="submit"
              className={`w-full text-white bg-accent hover:bg-accent/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : ''}`}
              onClick={(e) => handleSubmit(e)}
              disabled={isSubmitting} // Disable the button while submitting
            >
              {isSubmitting ? "Listing...." : "List Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
