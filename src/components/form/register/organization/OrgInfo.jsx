import React from 'react';
import { ethers } from 'ethers';

function OrgInfo({
  formData, setFormData, validationErrors, updateFormValue,
}) 
{
  const connectWallet = async () => {
  try {
    if (!formData.openToWork) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const displayAddress = address?.substr(0, 8) + "...";
      const message = "Welcome";
      const sig = await signer.signMessage(message);
      ethers.verifyMessage(message, sig);

      setFormData({
        ...formData,
        openToWork: true,
        walletAddress: displayAddress,
      });
    } else {
      setFormData({
        ...formData,
        openToWork: false,
        walletAddress: null,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};


return (
  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 h-[40vh] overflow-y-scroll scroll-smooth z-100 scrollbar p-3">
    <div className="flex flex-auto gap-5 w-full items-center justify-between mb-15">
    </div>

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
            onClick={connectWallet}
          >
            {/* Display wallet address when connected, otherwise display "Connect To Wallet" */}
            {formData.openToWork ? formData.walletAddress : 'Connect To Wallet '}
          </button>
        </div>
      </label>
    </div>
  </div>
);
}

export default OrgInfo;
