function OrgInfo({
  formData, setFormData, validationErrors, updateFormValue,
}) {
//   about;
//   domain;
//   website;

  return (
    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 h-[30vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
      {/* <div className="relative">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          CNIC
        </p>
        <input
          placeholder="13 digit (XXXXX-XXXXXX-X)"
          type="text"
          value={formData.domain}
          onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
          className="border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
        />
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
          Website
        </p>
        <input
          placeholder="example.com"
          type="text"
          value={formData.website}
          onChange={(e) => updateFormValue("website", e.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.website ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.website && (
        <p className="text-red-500">{validationErrors.website}</p>
        )}

      </div> */}
      {/* <div className="relative w-full">
        <p
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
        >
          About Company
        </p>
        <textarea
          rows="4"
          placeholder="description..."
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          className="border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
        />
      </div> */}
    </div>
  );
}

export default OrgInfo;
