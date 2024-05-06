import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Details({
  formData, validationErrors, updateFormValue,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [cnicFrontPic, setCnicFrontPic] = useState(null);

  const handleProfilePicChange = (event) => {
    if (event.target.files.length > 0) {
      setProfilePic(event.target.files[0]);
    }
  };

  const handleCnicFrontPicChange = (event) => {
    if (event.target.files.length > 0) {
      setCnicFrontPic(event.target.files[0]);
    }
  };

  const uploadToPinata = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading file to Pinata:", error);
      toast.error("Error uploading file to IPFS.");
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const uploads = [];
    if (profilePic) uploads.push(uploadToPinata(profilePic));
    if (cnicFrontPic) uploads.push(uploadToPinata(cnicFrontPic));

    const ipfsHashes = await Promise.all(uploads);
    console.log("Successfully uploaded files to IPFS with hashes:", ipfsHashes);
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="relative w-full">
        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Name*</p>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => updateFormValue("name", e.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.name ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.name && (
          <p className="text-red-500">{validationErrors.name}</p>
        )}
      </div>

      <div className="relative">
        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">CNIC*</p>
        <input
          type="text"
          required
          value={formData.cnic}
          onChange={(event) => updateFormValue("cnic", event.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.cnic ? 'focus:border-red-500 border-red-300' : ''}`}
        />
      </div>

      <div className="relative">
        <label className="block text-gray-600 mb-2">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="relative">
        <label className="block text-gray-600 mb-2">CNIC Front Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCnicFrontPicChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      <button
        type="submit"
        className={`w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Confirm"}
      </button>
    </form>
  );
}

export default Details;
