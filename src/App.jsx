import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import LoadingBar from 'react-top-loading-bar';
import { useContext } from 'react';
import Header from './components/Header';
import Home from './modules/Home';
import AgreementListings from './modules/AgreementListings';
import PropertyListings from './modules/PropertyListings';
import AgreementMain from './modules/AgreementMain';
import ProjectMain from './modules/ProjectMain';
import Login from './modules/Login';
import Register from './modules/Register';
import RegisterStateAgent from './modules/RegisterStateAgent';
import RegisterTenantORLandlord from './modules/RegisterTenantORLandlord';
import AboutUs from './modules/AboutUs';
import PropertyAdd from './modules/PropertyAdd';
import StateAgentLogin from './components/form/login/StateAgentLogin';
import TenantLogin from './components/form/login/TenantLogin';
import AgreementAdd from './modules/AgreementAdd';
import Profile from './components/profile/Profile';
import { loadingContext } from './components/context/LoadingState';
import LandlordLogin from './components/form/login/LandlordLogin';

function App() {
  const progressState = useContext(loadingContext);
  const { progress } = progressState;


  return (
    <>
      <LoadingBar
        color="#6c47ff"
        height={10}
        progress={progress}
      />
      <Header />
      <div className="pt-20">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/properties"
            element={<PropertyListings />}
          />
          <Route
            path="/properties/create"
            element={<PropertyAdd />}
          />
          <Route
            path="/about"
            element={<AboutUs />}
          />
          <Route
            path="/properties/:uid"
            element={<ProjectMain />}
          />
          <Route
            path="/agreements/create/:uid"
            element={<AgreementAdd />}
          />
          <Route
            path="/agreements"
            element={<AgreementListings />}
          />
          <Route
            path="/agreements/:uid"
            element={<AgreementMain />}
          />


          {/* -------------Profile----------------- */}
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/login/stateAgent"
            element={<StateAgentLogin/>}
          />
          <Route
            path="/login/landlord"
            element={<LandlordLogin />}
          />
          <Route
            path="/login/tenant"
            element={<TenantLogin/>}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/register/stateAgent"
            element={<RegisterStateAgent />}
          />
          <Route
            path="/register/tenantORlandlord"
            element={<RegisterTenantORLandlord />}
          />
        </Routes>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
