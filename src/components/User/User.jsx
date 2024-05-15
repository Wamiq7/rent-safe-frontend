import {
    useContext, useEffect, useRef, useState,
} from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

import loading from "../../../public/SVG/loading.svg";

export default function User() {
    const [user, setuser] = useState({});
    const { walletAddress } = useParams();


    if (
        !user
    ) {
        return (
            <div className="flex w-full py-10 justify-center text-slate-500">
                <img alt="loader" src={loading} />
            </div>
        );
    }
    const fetchUser = async () => {


        try {


            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/veiwDetails/walletAddress/${walletAddress}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setuser(data);


        }
        catch (error) {
            console.error('Error:', error.message);
        }



    }


    useEffect(() => {
        fetchUser()


    }, [])


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
                            alt="User"
                            src={`https://gateway.pinata.cloud/ipfs/${user?.displayPicture}`}
                            className="inline-block object-cover aspect-square  h-full p-0 shadow shadow-accent rounded-full"
                        />
                    </div>


                    <div className="flex flex-col justify-between lg:pb-16 h-full  gap-3">
                        {/* --------user Name------------------- */}
                        <h1 className="text-3xl lg:text-5xl font-medium text-slate-900">
                            {user?.name}
                            {' '}
                        </h1>
                        {/* <div className="flex place-content-start items-center w-full text-slate-600 gap-1">
              <BiSolidMap />
              <p>
                {user?.city}
              </p>
            </div> */}
                    </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row justify-start w-full items-start place-content-start">
                    {/* ----------Col-1----------------*/}
                    <div className="flex flex-col gap-6 px-5 py-7  mr-2  md:w-1/3">
                        <div className="flex flex-col gap-2  ">
                            <h1 className="text-lg text-slate-900 font-medium">Role</h1>
                            <p className="description">{user?.role === 0 ? 'Estate Agent' : user?.role === 1 ? 'Landlord' : 'Tenant'}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-lg text-slate-900 font-medium">
                                Wallet Address
                            </h1>
                            <p className="description truncate">{walletAddress}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-lg text-slate-900 font-medium">
                                CNIC
                            </h1>
                            <p className="description">{user?.cnic}</p>
                        </div>


                    </div>
                    {/* ----------Col-2----------------*/}
                    <div className="flex flex-col border-b md:border-b-0 md:border-l md:pl-2 border-slate-300 gap-6 md:w-2/3 pb-10">
                        <div className="flex flex-col gap-2 px-5 py-7">
                            {/* ---------Domain------------ */}
                            <p className="description">
                                Rent Safe, our blockchain-powered platform, ensures unparalleled security for all users—real estate agents, tenants, and landlords. With decentralized technologies, your property transactions are safeguarded against fraud and unauthorized access. Enjoy the peace of mind that comes with Rent Safe, where your rental process is fortified by cutting-edge security measures, creating a trusted and secure environment for everyone involved.
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



