import organization from '../../../../public/organization.svg';
import LoginContainer from './LoginContainer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ethers } from 'ethers';

function App(props) {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState();

  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const connect = async () => {
    try {
      if (!connected) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(await signer.getAddress());
        const displayAddress = address?.substr(0, 8) + "...";
        const message = "Welcome";
        const sig = await signer.signMessage(message);
        ethers.verifyMessage(message, sig);
        setId(displayAddress);
        setConnected(true);
      } else {
        window.ethereum.selectedAddress = null;
        setConnected(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const signIn = async () => {
    if (connected) {

      try {


        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/veiwDetails/walletAddress/${walletAddress}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.cnic !== "") {
          if (data.role === 1) {

            toast.success('You are logged in now.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });

            localStorage.clear();
            localStorage.setItem('Islandlord', 'true');

            navigate('/');
          } else {
            toast.warning('You are not registered as Landlord')
          }
        }
        else {
          toast.success('User not found!');
        }
      }
      catch (error) {
        console.error('Error:', error.message);
      }



    }
    else {
      // Show a message or perform some action if not connected
      toast.error("Connect your wallet first");
    }
  };

  return (
    <LoginContainer image={organization}>
      <div className="w-full h-2/3 flex items-start justify-center">
        <section className="flex flex-col mt-20">
          <button
            role="switch"
            id="flexSwitchChecked"
            className={`relative inline-flex items-center px-20 py-3 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform transition-transform hover:scale-105 animate-spin ${connected ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            onClick={connect}
          >
            {connected ? id : "Connect Wallet"}
          </button>

          {/* Always show the Sign In button, but make it clickable only when connected */}
          <button
            className={`mt-4 px-20 py-6 bg-blue-500 text-white rounded-md ${connected ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            onClick={signIn}
            disabled={!connected}
          >
            Sign In
          </button>
        </section>
      </div>
    </LoginContainer>
  );
}

export default App;
