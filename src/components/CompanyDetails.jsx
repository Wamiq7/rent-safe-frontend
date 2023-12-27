/* eslint-disable camelcase */
// import { BiSolidMap } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";
import { MdPendingActions, MdReviews } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import ProjectDeleteConfirmationDialog from "./modals/ProjectDeleteConfirmationDialog";
import Star from "./Star";
import ReviewVaul from "./modals/ReviewVaul";
import loading from "../../public/SVG/loading.svg";


function CompanyDetails({
  agreementData, update, edit,
}) {


  const [deleteBtn, setDeleteBtn] = useState(false);
  const [selectedUID, setSelectedUID] = useState([]);
  const [reviewVaulOpen, setReviewVaulOpen] = useState(false);

  const profile=useParams();


  // return true/false for the agreementData object prop recieved
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return (
    (!isObjectEmpty(agreementData)) ? (
      <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3">
        <div
          className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
            items-center border z-10 relative
           border-slate-300  bg-white/50 rounded-2xl my-6 mb-10"
        >
          {/* ------------------Company Banner */}
          <div className="flex justify-start w-full mt-6 items-start place-content-start gap-[5%] border-b border-slate-300 px-5 py-7 relative">
            <div className="flex items-center relative justify-center h-24 p-0 m-0">
              <img
                alt="banner"
                src={agreementData.banner_img}
                className="inline-block object-cover aspect-video h-full p-0 shadow rounded-xl"
              />
            </div>

            <div className="flex flex-col justify-between items-start gap-3">
              {/* --------Company Name------------------- */}
              <h1 className="text-3xl font-medium text-slate-900">
                {agreementData.title}
              </h1>
              <div className="flex place-content-start items-center w-full text-slate-600 gap-1">
                {/* <BiSolidMap /> */}
                {/* ------------------------ Company Location-------------------------- */}
                {/* <p>India</p> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-start w-full items-start place-content-start">
            {/* ----------Col-1----------------*/}
            <div className="flex flex-col gap-6 px-5 py-7  mr-2  md:w-1/3 relative">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap">
                  <ul className="flex flex-wrap  gap-2 text-black">
                 
                    <li
                      key={agreementData.propertyDetails._id}
                      className="border text-accent border-slate-300 px-2 py-1 bg-accent/5 text-sm rounded-2xl"
                    >
                      <span className='font-bold'>Status : </span> {agreementData.status}
                    </li>
                  </ul>
                </div>
                <h1 className="text-lg "><span className='font-semibold'>Agreement Id :</span> {agreementData._id}</h1>

              <div className="flex flex-col gap-2">
                <h1 className="text-lg text-slate-900 font-medium">
                  Duration : {agreementData.duration} months
                </h1>
                <h1 className="text-lg text-slate-400 font-medium">
                  
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-lg text-slate-900 font-medium">
                  Rent : {agreementData.rent}/= Rs
                </h1>
                <h1 className="text-lg text-slate-400 font-medium">
                  
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-lg text-slate-900 font-medium">
                  Advance : {agreementData.advance}/= Rs
                </h1>
                <h1 className="text-lg text-slate-400 font-medium">
                  
                </h1>
              </div>
              </div>
            </div>
            {/* ----------Col-2----------------*/}
            <div className="flex flex-col border-b md:border-b-0 md:border-l md:pl-2 border-slate-300 md:gap-6 md:w-2/3 pb-10">
              <div className="flex flex-col gap-2 px-5 py-7">
                {/* ---------Company Name------------ */}
                <h1 className="text-2xl font-semibold mb-3">
                  Extra Details/Requirements
                </h1>
                <p className="description">{agreementData.extraDetails}</p>
              </div>
            </div>
          </div>
        </div>

        {/* keep thiss dialog component ouotside here so that it doesnt overlap with other components */}
        {/* render ConfirmationDialog only if selectedUID && deleteBtn are available */}
        {/* {selectedUID && deleteBtn && (
        <ProjectDeleteConfirmationDialog
          cancel={() => setDeleteBtn(!deleteBtn)}
          deleteBtn={deleteBtn}
          setDeleteBtn={setDeleteBtn}
          propUid={selectedUID}
          onDeleteSuccess={handleDeleteSuccess}
        />
        )} */}

        <div
          className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
            items-center border z-10 relative
           border-slate-300  bg-white/50 rounded-2xl my-6 mb-10"
        >
          <div className="flex w-full flex-col">
            <h1 className="text-2xl font-semibold px-5 pt-7 mb-1">Property Details</h1>
            {/* ---------TODO: Comapny Projects------------ */}
            <div className=" py-5">
             
                <div className="flex w-full justify-between items-center py-5 relative border-t px-5 gap-5 border-slate-300" key={agreementData.propertyDetails._id}>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-0">
                    <div className="flex items-start justify-start">
                      <img
                        src={agreementData.propertyDetails.thumbnail}
                        alt=""
                        className="w-[30vw]  md:w-40 rounded-lg  object-cover aspect-video mr-8"
                      />
                      <div className="flex flex-col md:hidden">
                        <Link to={`/projects/${agreementData.propertyDetails._id}`} className=" text-xl font-semibold  hover:text-accent">{agreementData.propertyDetails.name}</Link>
                        <p>{agreementData.propertyDetails._id}</p>
                      </div>
                    </div>
                    <div className="lg:w-[60%] md:pl-6">
                      <Link to={`/projects/${agreementData.propertyDetails._id}`} className="hidden md:flex text-xl font-semibold  hover:text-accent">{agreementData.propertyDetails.propertyType}</Link>
                      <div className="hidden md:flex place-content-start items-center w-full text-slate-600 gap-1">
                        {/* ------------------------ Project Description-------------------------- */}
                        <p><span className='font-bold'>Id : </span> {agreementData.propertyDetails._id}</p>
                      </div>
                      <p className="description   w-full md:w-[90%]">
                      <span className='font-bold'>Description : </span> {agreementData.propertyDetails.description}
                      </p>
                    </div>
                  </div>
                  {/* -------Delete Button------- */}
{/* 
                  <div className="absolute top-6 right-3 md:flex">
                    {!profile.uid && localStorage.getItem("isOrg")
                    && (
                      <button
                        type="button"
                        onClick={() => deleteProject(project.uid)}
                        className="text-red-500 text-xl lg:text-2xl bg-red-50 hover:bg-red-500 hover:text-white p-3 rounded-xl"
                      >
                        <IoTrashBinOutline />
                      </button>
                    )}
                  </div> */}

                </div>

            </div>
          </div>

        </div>
        {/* ----------Company Reviews------------ */}
        <div
          className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
            items-center border z-10 relative
           border-slate-300  bg-white/50 rounded-2xl my-6"
        >
          <div className="flex w-full flex-col">
            <h1 className="text-2xl font-semibold px-5 pt-7 mb-3">Individuals/Entities Involved</h1>
            <div className="py-5">
             {/* Landlord  */}
                <div className="flex w-full justify-between items-center py-5 relative border-t px-5 gap-5 border-slate-300" key={agreementData.landlord._id}>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-0">
                    <div className="flex items-center justify-start">
                      <img
                        src={agreementData.landlord.pic}
                        alt=""
                        className="w-[20vw] h-full md:w-20 md:h-20 object-cover aspect-square rounded-full md:mr-0 mr-4"
                      />
                      <div>
                        <div
                          className="flex md:hidden text-xl font-semibold  hover:text-accent"
                        >
                          {agreementData.landlord.name}

                        </div>
                        <div className="md:hidden description w-full md:w-[90%] flex items-center">
                          {agreementData.landlord.cnic}
                         
                        </div>
                        <div className="md:hidden description w-full md:w-[90%] flex items-center">
                          {agreementData.landlord.walletAddress}
                         
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-[80%] md:pl-6">
                      <div
                        className="hidden md:flex text-xl mb-1  font-semibold  hover:text-accent"
                      >
                        {agreementData.landlord.name}
                      </div>
                      <div className="hidden description w-full md:w-[90%] md:flex items-center">
                      <span className='font-bold'>Role : </span> Landlord
                        
                      </div>

                      <div className="place-content-start items-center w-full text-slate-600 ">
                      <span className='font-bold'> CNIC : </span>{agreementData.landlord.cnic}
                      </div>
                      <div className="place-content-start items-center w-full text-slate-600 ">
                      <span className='font-bold'> Wallet : </span>{agreementData.landlord.walletAddress}
                      </div>
                      
                    </div>
                  </div>
                </div>
               {/* tenant  */}
               <div className="flex w-full justify-between items-center py-5 relative border-t px-5 gap-5 border-slate-300" key={agreementData.landlord._id}>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-0">
                    <div className="flex items-center justify-start">
                      <img
                        src={agreementData.tenant.pic}
                        alt=""
                        className="w-[10vw] h-full md:w-20 md:h-20 object-cover aspect-square rounded-full md:mr-0 mr-4"
                      />
                      <div>
                        <div
                          className="flex md:hidden text-xl font-semibold  hover:text-accent"
                        >
                          {agreementData.tenant.name}

                        </div>
                        <div className="md:hidden description w-full md:w-[90%] flex items-center">
                          {agreementData.tenant.cnic}
                         
                        </div>
                        <div className="md:hidden description w-full md:w-[90%] flex items-center">
                          {agreementData.tenant.walletAddress}
                         
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-[80%] md:pl-6">
                      <div
                        className="hidden md:flex text-xl mb-1  font-semibold  hover:text-accent"
                      >
                        {agreementData.tenant.name}
                      </div>
                      <div className="hidden description w-full md:w-[90%] md:flex items-center">
                      <span className='font-bold'>Role : </span> Tenant
                        
                      </div>

                      <div className="place-content-start items-center w-full text-slate-600 ">
                      <span className='font-bold'> CNIC : </span>{agreementData.tenant.cnic}
                      </div>
                      <div className="place-content-start items-center w-full text-slate-600 ">
                      <span className='font-bold'> Wallet : </span>{agreementData.tenant.walletAddress}
                      </div>
                      
                    </div>
                  </div>
                </div>

                {/* //StateAgent  */}

                <div className="flex w-full justify-between items-center py-5 relative border-t px-5 gap-5 border-slate-300" key={agreementData.landlord._id}>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-0">
                    <div className="flex items-center justify-start">
                      <img
                        src={agreementData.stateAgent.pic}
                        alt=""
                        className="w-[10vw] h-full md:w-20 md:h-20 object-cover aspect-square rounded-full md:mr-0 mr-4"
                      />
                      <div>
                        <div
                          className="flex md:hidden text-xl font-semibold  hover:text-accent"
                        >
                          {agreementData.stateAgent.name}

                        </div>
                        <div className="md:hidden description w-full md:w-[90%] flex items-center">
                          {agreementData.stateAgent.cnic}
                         
                        </div>
                        <div className="md:hidden description w-full md:w-[90%] flex items-center">
                          {agreementData.stateAgent.walletAddress}
                         
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-[80%] md:pl-6">
                      <div
                        className="hidden md:flex text-xl mb-1  font-semibold  hover:text-accent"
                      >
                        {agreementData.stateAgent.name}
                      </div>
                      <div className="hidden description w-full md:w-[90%] md:flex items-center">
                      <span className='font-bold'>Role : </span> State Agent
                        
                      </div>

                      <div className="place-content-start items-center w-full text-slate-600 ">
                      <span className='font-bold'> CNIC : </span>{agreementData.stateAgent.cnic}
                      </div>
                      <div className="place-content-start items-center w-full text-slate-600 ">
                      <span className='font-bold'> Wallet : </span>{agreementData.stateAgent.walletAddress}
                      </div>
                      <div className="place-content-start items-center w-full text-slate-600 ">
                      <span className='font-bold'> Estate Name : </span>{agreementData.stateAgent.estateName}
                      </div>
                      
                    </div>
                  </div>
                </div>


            </div>
          </div>
        </div>
        {/* ----------END  Company Reviews------------ */}


      </div>
    ) : (
      <div className="flex w-full py-10 justify-center text-slate-500">
        <img alt="loader" src={loading} />
      </div>
    )
  );
}

export default CompanyDetails;
