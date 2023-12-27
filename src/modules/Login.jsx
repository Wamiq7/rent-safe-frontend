import { Link } from 'react-router-dom';
import LoginContainer from '../components/form/login/LoginContainer';
import Skate from '../../public/Run_Skate.png';

function Login() {
  const commonHeadingStyle = "text-white font-bold text-4xl transition items-center justify-center hover:bg-full hover:font-bold rounded-lg h-full w-[60%] max-w-full relative p-2";
  const commonButtonStyle = "relative bg-gradient-to-r from-blue-500 to-blue-600 text-white text-2xl font-bold px-8 py-4 rounded-full hover:scale-105 transform transition-transform overflow-hidden";

  return (
    <LoginContainer image={Skate} className="relative h-full w-full">
      <div className="flex flex-col w-full relative h-full py-3 items-center gap-5 justify-center text-center mt-5 ">
        {/* <h1 className="text-5xl font-bold mb-auto text-white"></h1> */}

        <Link
          className={`${commonHeadingStyle} ${commonButtonStyle} bg-green-500`}
          to="/login/stateAgent"
        >
          <h1>Estate Agent</h1>
          <div className="cloud-shape"></div>
        </Link>
        <div className="border-b border-slate-300 w-full"></div>

        <Link
          className={`${commonHeadingStyle} ${commonButtonStyle} bg-pink-500`}
          to="/login/Landlord"
        >
          <h1>Landlord</h1>
          <div className="cloud-shape"></div>
        </Link>
        <div className="border-b border-slate-300 w-full"></div>

        <Link
          className={`${commonHeadingStyle} ${commonButtonStyle} bg-red-600`}
          to="/login/tenant"
        >
          <h1>Tenant</h1>
          <div className="cloud-shape"></div>
        </Link>
      </div>
    </LoginContainer>
  );
}

export default Login;
