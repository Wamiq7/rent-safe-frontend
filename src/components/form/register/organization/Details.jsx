import React, { useState } from 'react';
function Details({
  formData, validationErrors, updateFormValue,
}) {


  return (
    <form className="space-y-8">
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

      {/* File inputs for Profile and CNIC Pictures */}
      <div className="relative">
        <label className="block text-gray-600 mb-2">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => updateFormValue('profilePic', event.target.files[0])}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="relative">
        <label className="block text-gray-600 mb-2">CNIC Front Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => updateFormValue('cnicPic', event.target.files[0])}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
    </form>
  );
}

export default Details;
