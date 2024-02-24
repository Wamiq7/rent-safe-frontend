import React from 'react';

function StateAgentDetails({
  formData, validationErrors, updateFormValue,
}) {
  // 1.Form
  // fName lname
  // cnic
  // Password
  // Re-enter Password

  return (
    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 h-[40vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
      <div className="flex flex-auto gap-5 w-full items-center justify-between">
        <div className="relative w-full mb-1">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-0 font-medium text-gray-600 absolute"
          >
            Name
          </p>
          <input
            name="fname"
            placeholder="John"
            type="text"
            required
            value={formData.fname}
            onChange={(event) => updateFormValue("fname", event.target.value)}
            className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.fname ? 'focus:border-red-500 border-red-300' : ''}`}
          />
          {validationErrors.fname && (
            <p className="text-red-500">{validationErrors.fname}</p>
          )}
        </div>
        <div className="relative w-full">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
          >
            Estate Name
          </p>
          <input
            placeholder="Wick"
            type="text"
            required
            value={formData.lname}
            onChange={(event) => updateFormValue("lname", event.target.value)}
            className={`border    placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.lname ? 'focus:border-red-500 border-red-300' : ''}`}
          />
          {validationErrors.lname && (
            <p className="text-red-500">{validationErrors.lname}</p>
          )}
        </div>
      </div>
      <div className="relative">
        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
          CNIC*
        </p>
        <input
          placeholder="13 digit (XXXXX-XXXXXX-X)"
          type="text"
          required
          value={formData.cnic}
          onChange={(event) => updateFormValue("cnic", event.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.cnic ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.cnic && (
          <p className="text-red-500">{validationErrors.cnic}</p>
        )}
      </div>
      {/* <div className="relative">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          Password*
        </p>
        <input
          placeholder="Password"
          type="password"
          required
          value={formData.password}
          onChange={(event) => updateFormValue("password", event.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.password ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.password && (
        <p className="text-red-500">{validationErrors.password}</p>
        )}

      </div> */}
      {/* <div className="relative">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
        >
          Re-enter Password
        </p>
        <input
          placeholder="Password"
          type="password"
          required
          value={formData.password}
          onChange={(event) => setFormData({ ...formData, password: event.target.value })}
          className="border placeholder-gray-400 focus:outline-none
                  focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
        />
      </div> */}
    </div>
  );
}

export default StateAgentDetails;