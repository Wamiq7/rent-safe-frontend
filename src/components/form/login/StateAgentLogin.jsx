import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginContainer from './LoginContainer';
import 'react-toastify/dist/ReactToastify.min.css';
import developer from '../../../../public/developer.svg';

export default function StateAgentLogin() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connected, setConnected] = useState(false);

  const onSignIn = () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const id = toast.loading('Please wait...', {
      position: toast.POSITION.TOP_CENTER,
    });

    // Simulating an asynchronous operation, as there's no actual login functionality provided
    setTimeout(() => {
      toast.update(id, {
        render: 'Login Successful',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });

      // Save "Istruestateagent" to local storage
      localStorage.setItem('Isstateagent', 'true');

      setIsSubmitting(false);
      navigate('/');
    }, 2000);
  };

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

  return (
    <LoginContainer image={developer}>
      <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
        <button
          type="button"
          onClick={() => onConnectWallet()} // Updated to call onConnectWallet instead of onSignIn
          className={`absolute -bottom-52 cursor-pointer pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
        rounded-lg transition duration-200 hover:bg-indigo-600 ease w-full ${isSubmitting ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Connecting...' : 'Connect to Wallet'}
        </button>

        <button
          type="button"
          onClick={() => onSignIn()} // Updated to call onSignIn instead of onConnectWallet
          className={`absolute -bottom-52 cursor-pointer pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
        rounded-lg transition duration-200 hover:bg-indigo-600 ease w-full ${isSubmitting ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sign In' : 'Sign In'}
        </button>
      </div>

      <div className="mt-8 ml-auto mr-auto text-center">
        <label
          htmlFor="flexSwitchChecked"
          className="inline-block text-gray-700 text-lg font-bold mb-8"
        >
          <div className="inline-block form-control mx-auto w-full max-w-md">
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