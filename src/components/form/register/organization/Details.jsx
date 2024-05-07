import React from 'react';

function StateAgentDetails({
  formData, validationErrors, updateFormValue,
}) {
  const handleCnicChange = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Removes non-digit characters
    if (value.length > 13) value = value.slice(0, 13); // Limit to 13 digits
    value = value.replace(/(\d{5})(\d{7})(\d{1})?/, '$1-$2-$3').trim(); // Format as "XXXXX-XXXXXXX-X"
    updateFormValue("cnic", value);
  };

  const handlePhoneChange = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Removes non-digit characters
    if (value.length > 11) value = value.slice(0, 11); // Limit to 11 digits
    value = value.replace(/(\d{3})(\d{7,8})/, '$1-$2').trim(); // Format as "XXX-XXXXXXXX"
    updateFormValue("phone", value);
  };

  return (
    <form className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 h-[40vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
      <div className="flex flex-auto gap-5 w-full items-center justify-between">
        <div className="relative w-full mb-1">
          <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-0 font-medium text-gray-600 absolute">
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
          {validationErrors.fname && <p className="text-red-500">{validationErrors.fname}</p>}
        </div>

      
      </div>

      <div className="relative">
        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-0 font-medium text-gray-600 absolute">
          CNIC (13 digit XXXXX-XXXXXXX-X)
        </p>
        <input
          placeholder="CNIC"
          type="text"
          required
          value={formData.cnic}
          onChange={handleCnicChange}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.cnic ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.cnic && <p className="text-red-500">{validationErrors.cnic}</p>}
      </div>

      <div className="relative">
        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-0 font-medium text-gray-600 absolute">
          Phone Number
        </p>
        <input
          name="phone"
          placeholder="Phone Number"
          type="text"
          required
          value={formData.phone}
          onChange={handlePhoneChange}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.phone ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.phone && <p className="text-red-500">{validationErrors.phone}</p>}
      </div>

      <div className="relative">
        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-1 mr-0 mb-0 ml-0 font-medium text-gray-600 absolute">
          Email Address
        </p>
        <input
          name="email"
          placeholder="Email Address"
          type="email"
          required
          value={formData.email}
          onChange={(event) => updateFormValue("email", event.target.value)}
          className={`border placeholder-gray-400 focus:outline-none focus:border-accent w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md ${validationErrors.email ? 'focus:border-red-500 border-red-300' : ''}`}
        />
        {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
      </div>

      <div className="relative">
        <label className="block text-gray-600 mb-2">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => updateFormValue('profilePic', event.target.files[0])}
          className="border border-gray-300 rounded-md p-2"
        />
        {validationErrors.profilePic && <p className="text-red-500">{validationErrors.profilePic}</p>}
      </div>

      <div className="relative">
        <label className="block text-gray-600 mb-2">CNIC Front Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => updateFormValue('cnicPic', event.target.files[0])}
          className="border border-gray-300 rounded-md p-2"
        />
        {validationErrors.cnicPic && <p className="text-red-500">{validationErrors.cnicPic}</p>}
      </div>
    </form>
  );
}

export default StateAgentDetails;
