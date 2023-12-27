import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { BiSolidMap } from 'react-icons/bi';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import loading from "../../../public/SVG/loading.svg";
import profileData from '../../modules/profile.json';

export default function Profile() {
  const [user, setuser] = useState(profileData.user);





  const skills = user?.skills;
  if (
    !Object.keys(user).length > 0 
  ) {
    return (
      <div className="flex w-full py-10 justify-center text-slate-500">
        <img alt="loader" src={loading} />
      </div>
    );
  }

    return (
      <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3">
        <div
          className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
            items-center border z-10 relative
           border-slate-300  bg-white/50 rounded-2xl my-6 mb-10"
        >
          <div className="flex justify-start lg:items-center w-full mt-6 items-start  place-content-start md:gap-[5%] border-b border-slate-300 px-5 py-7 relative">
            <div className="flex items-center relative justify-center h-24 lg:h-80 p-0 m-0">
              <img
                alt="profile"
                src={user?.profile_pic}
                className="inline-block object-cover aspect-square  h-full p-0 shadow shadow-accent rounded-full"
              />
            </div>


            <div className="flex flex-col justify-between lg:pb-16 h-full  gap-3">
              {/* --------user Name------------------- */}
              <h1 className="text-3xl lg:text-5xl font-medium text-slate-900">
                {user?.fname}
                {' '}
                {user?.lname}
              </h1>
              <div className="flex place-content-start items-center w-full text-slate-600 gap-1">
                <BiSolidMap />
                {/* ------------------------ user City-------------------------- */}
                <p>
                  {user?.city}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-start w-full items-start place-content-start">
            {/* ----------Col-1----------------*/}
            <div className="flex flex-col gap-6 px-5 py-7  mr-2  md:w-1/3">
              <div className="flex flex-col gap-2  ">
                <h1 className="text-lg text-slate-900 font-medium">Role</h1>
                <p className="description">{user?.role}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-lg text-slate-900 font-medium">
                  Wallet Address
                </h1>
                <p className="description">{user?.walletAddress}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-lg text-slate-900 font-medium">
                  CNIC
                </h1>
                <p className="description">{user?.CNIC}</p>
              </div>
              
              
            </div>
            {/* ----------Col-2----------------*/}
            <div className="flex flex-col border-b md:border-b-0 md:border-l md:pl-2 border-slate-300 gap-6 md:w-2/3 pb-10">
              <div className="flex flex-col gap-2 px-5 py-7">
                {/* ---------Domain------------ */}
                <h1 className="text-2xl font-semibold mb-3">
                  {user?.role}
                </h1>
                <p className="description">
                  {user?.about}
                </p>
              </div>
              <div className="flex flex-col gap-2 ml-5">
                <h1 className="text-lg text-slate-900 font-medium">Contact</h1>
                <Link
                  to={`mailto:${user?.email}`}
                  className="contact-dev"
                >
                  <FaEnvelope />
                  {user?.email}
                </Link>
                <Link
                  to={`tel:${user?.phone}`}
                  className="contact-dev"
                >
                  <FaPhone />
                  {user?.phone}
                </Link>
              </div>
            </div>
          </div>
        </div>
    
          </div>
     
    );
  }

 

