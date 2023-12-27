import React from 'react';

function PersonalInfo({
  formData, setFormData, validationErrors, updateFormValue,
}) {
//   2.Form
// Phone
// City
// Qualification
// Technical role
// Skills
// OpenToWork

  return (
    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 h-[40vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
      {/* <div className="relative">
        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
          
          Phone*
        </p>
        <input
          placeholder="+91-9876543210"
          type="tel"
          required
          value={formData.phone}
          onChange={(event) => updateFormValue("phone", event.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.phone ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.phone && (
        <p className="text-red-500">{validationErrors.phone}</p>
        )}

      </div> */}
      <div className="flex flex-auto gap-5 w-full items-center justify-between mb-15">
        {/* <div className="relative w-full">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
          >
                  CNIC
          </p>
          <input
            placeholder="13 digit (XXXXX-XXXXXX-X)"
            type="text"
            value={formData.city}
            onChange={(event) => setFormData({ ...formData, city: event.target.value })}
            className="border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
          />
        </div> */}
        {/* <div className="relative w-full">
          <p
            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
          >
       
            Profession
          </p>
          <input
            placeholder="web developer"
            type="text"
            value={formData.technical_role}
            onChange={(event) => setFormData({ ...formData, technical_role: event.target.value })}
            className="border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
          />
        </div> */}
      </div>
      {/* <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          
          Estate Name
        </p>
        <input
          placeholder="Estate Name"
          type="text"
          value={formData.qualification}
          onChange={(event) => setFormData({ ...formData, qualification: event.target.value })}
          className="border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
        />
      </div> */}
      {/* <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          Skills
        </p>
        <textarea
          rows="2"
          placeholder="HTML, CSS, JS, .....(Please insert skills comma and space separated"
          value={formData.skills}
          onChange={(event) => updateFormValue("skills", event.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.skills ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.skills && (
        <p className="text-red-500">{validationErrors.skills}</p>
        )}

      </div> */}

<div className="mb-4 text-center">
  <label
    htmlFor="flexSwitchChecked"
    className="inline-block text-gray-700 text-lg font-bold mb-8"
  >
    <div className="inline form-control">
      <button
        role="switch"
        id="flexSwitchChecked"
        className={`relative inline-flex items-center px-10 py-3 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform transition-transform hover:scale-105 animate-spin ${
          formData.openToWork ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
        }`}
        onClick={() =>
          setFormData({
            ...formData,
            openToWork: !formData.openToWork,
          })
        }
      >
        {/* Customizable icon or text for the button */}
        {formData.openToWork ? 'Connected' : 'Connect To Wallet '}
      </button>
    </div>
  </label>
</div>


      {/* <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          Linkedin Profile URL
        </p>
        <input
          placeholder="http://linkedin.com/...."
          type="text"
          value={formData.linkedin}
          onChange={(event) => updateFormValue("linkedin", event.target.value)}
          className={`border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.linkedin ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.linkedin && (
        <p className="text-red-500">{validationErrors.linkedin}</p>
        )}
      </div> */}
      {/* <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          Github Profile URL
        </p>
        <input
          placeholder="http://github.com/...."
          type="text"
          value={formData.github}
          onChange={(event) => updateFormValue("github", event.target.value)}
          className={`border   placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.github ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.github && (
        <p className="text-red-500">{validationErrors.github}</p>
        )}

      </div> */}
    </div>
  );
}

export default PersonalInfo;
