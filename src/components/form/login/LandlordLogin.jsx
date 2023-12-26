import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import organization from '../../../../public/organization.svg';
import LoginContainer from './LoginContainer';

export default function LandlordLogin() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connected, setConnected] = useState(false);

  const onConnectWallet = () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const id = toast.loading('Connecting to Wallet...', {
      position: toast.POSITION.TOP_CENTER,
    });

    // Simulating an asynchronous operation, as there's no actual wallet connection functionality provided
    setTimeout(() => {
      toast.update(id, {
        render: 'Wallet Connected',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });

      setIsSubmitting(false);
      setConnected(true); // Update the state to indicate wallet connection
    }, 2000);
  };

  const onSignIn = () => {
    if (!connected) {
      toast.error('Please connect your wallet first.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      return;
    }

    toast.success('You are logged in now.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

    // Save "IstrueLandlord" to local storage
    localStorage.setItem('Islandlord', 'true');

    // You can add additional logic here for actual sign-in process if needed

    // Navigate to the desired page after login
    navigate('/dashboard');
  };

  return (
    <LoginContainer image={organization}>
      <div className="w-full mr-0 mb-0 ml-0 relative space-y-8">
        <button
          type="button"
          onClick={() => onSignIn()}
          className={`absolute -bottom-52 cursor-pointer pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease w-full ${isSubmitting ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sign In' : 'Sign In'}
        </button>
      </div>

      <div className="mb-20  ml-auto mr-auto text-center h-full flex justify-center items-center">
        <label
          htmlFor="flexSwitchChecked"
          className="inline-block text-gray-700 text-lg font-bold mb-8"
        >
          <div className="inline-block form-control">
            <button
              role="switch"
              id="flexSwitchChecked"
              className={`relative inline-flex items-center px-10 py-3 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform transition-transform hover:scale-105 animate-spin ${
                connected ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={() => onConnectWallet()}
            >
              {connected ? 'Connected' : 'Connect To Wallet'}
            </button>
          </div>
        </label>
      </div>
    </LoginContainer>
  );
}
