function OrgInfo({
  formData, setFormData, validationErrors, updateFormValue,
}) {
//   about;
//   domain;
//   website;

  return (
    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 h-[30vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">

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

 
    </div>
  );
}

export default OrgInfo;
