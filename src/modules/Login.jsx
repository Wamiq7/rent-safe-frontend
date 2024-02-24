import { Link } from 'react-router-dom';
import LoginContainer from '../components/form/login/LoginContainer';
import Skate from '../../public/Run_Skate.png';

function Login() {
  const commonHeadingStyle = "flex h-full text-white font-bold text-4xl transition items-center justify-center hover:bg-full hover:font-bold rounded-lg w-[60%] max-w-full relative p-2";

  return (
    <LoginContainer image={Skate} className="relative h-full w-full">
      <div className="flex flex-col w-full relative h-full py-3 items-center gap-5 justify-center text-center mt-5 ">
        {/* <h1 className="text-5xl font-bold mb-auto text-white"></h1> */}

        <Link
          className={`${commonHeadingStyle} bg-green-500`}
          to="/login/stateAgent"
        >
          <h1>Estate Agent</h1>
          <div className="cloud-shape"></div>
        </Link>
        <div className="border-b border-slate-300 w-full"></div>

        <Link
          className={`${commonHeadingStyle} bg-pink-500`}
          to="/login/Landlord"
        >
          <h1>Landlord</h1>
          <div className="cloud-shape"></div>
        </Link>
        <div className="border-b border-slate-300 w-full"></div>

        <Link
          className={`${commonHeadingStyle} bg-red-600`}
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
