import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function StateAgentDetails({
  formData, validationErrors, updateFormValue,
}) {

  return (
    <form className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 h-[40vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
      {/* Name, Estate Name, and CNIC input */}
      <div className="flex flex-auto gap-5 w-full items-center justify-between">
        <div className="relative w-full mb-1">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-0 font-medium text-gray-600 absolute"
          >
            Name
          </p>
          <input
            name="fname"
            placeholder="Name"
            type="text"
            required
            value={formData.fname}
            onChange={(event) => updateFormValue("fname", event.target.value)}
            className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.fname ? 'focus:border-red-500 border-red-300' : ''}`}
          />
        </div>
        <div className="relative w-full">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-0 font-medium text-gray-600 absolute"
          >
            Estate Name
          </p>
          <input
            placeholder="Estate Name"
            type="text"
            required
            value={formData.estateName}
            onChange={(event) => updateFormValue("estateName", event.target.value)}
            className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.estateName ? 'focus:border-red-500 border-red-300' : ''}`}
          />
        </div>
      </div>

      <div className="relative">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-0 font-medium text-gray-600 absolute"
        >
          CNIC *
        </p>
        <input
          placeholder="CNIC (13 digit XXXXX-XXXXXXX-X)"
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

export default StateAgentDetails;
