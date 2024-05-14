import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import loading from "../../public/SVG/loading.svg";


function AgreementDetails({
  agreementData,
}) {


  const isStateAgent = localStorage.getItem("Isstateagent")
  const islandlord = localStorage.getItem("Islandlord")
  const isTenanat = localStorage.getItem("Istenant")



  // return true/false for the agreementData object prop recieved
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const handleTerminate = () => {
  }
  function weiToPKR(weiAmount) {
    // const etherPriceInPKR = 810483; // Current price of 1 Ether in PKR
    // const weiPerEther = 10 ** 18; // 1 Ether equals 10^18 wei

    // // Convert wei to Ether
    // const etherAmount = weiAmount / weiPerEther;

    // // Convert Ether to PKR
    // const pkrAmount = etherAmount * etherPriceInPKR;
    const pkrAmount = weiAmount * 1000;
    return pkrAmount;
  }


  return (
    (!isObjectEmpty(agreementData)) ? (
      <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3">
        <div
          className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
            items-center border z-10 relative
           border-slate-300  bg-white/50 rounded-2xl my-6 mb-10"
        >
          {/* ------------------Agreement Banner */}
          <div className="flex justify-start w-full mt-6 items-start place-content-start gap-[5%] border-b border-slate-300 px-5 py-7 relative">
            <div className="flex items-center relative justify-center h-24 p-0 m-0">
              <img
                alt="banner"
                src={`https://gateway.pinata.cloud/ipfs/${agreementData.propertyDetails.thumbnailImage}`}
                className="inline-block object-cover aspect-video h-full p-0 shadow rounded-xl"
              />
            </div>

            <div className="flex flex-col justify-between items-start gap-3">
              {/* --------Agreement Name------------------- */}
              <div className="flex text-base  text-start font-normal gap-3 items-start">
                <p className="text-base font-medium">
                  Rs.
                  {' '}
                  {weiToPKR(agreementData.rentAmount)}
                  {' '}
                  <br />
                  {' '}
                  <span className="text-sm font-light text-slate-600">
                    Rent Amount
                  </span>
                </p>
              </div>
              {isStateAgent && agreementData.status <= 2 && (
                <div className="absolute top-6 right-10 md:flex">

                  <button
                    type="button"
                    className="text-green-500 border border-solid border-green-500 text-xl lg:text-2xl bg-green-50 hover:bg-green-500 hover:text-white p-3 rounded-xl"
                  >
                    Activate
                  </button>

                </div>
              )}
              {(isStateAgent && agreementData.status === 3) && (
                <div className="absolute top-6 right-10 md:flex">

                  <button
                    onClick={handleTerminate}
                    type="button"
                    className="text-red-500 border border-solid border-red-500 text-xl lg:text-2xl bg-red-50 hover:bg-red-500 hover:text-white p-3 rounded-xl"
                  >
                    Terminate
                  </button>

                </div>
              )}
              {(isTenanat && agreementData.status === 3 && agreementData.tenantApprovalForCancellation === false) && (
                <div className="absolute top-6 right-10 md:flex">

                  <button
                    type="button"
                    className="text-red-500 border border-solid border-red-500  text-xl lg:text-2xl bg-red-50 hover:bg-red-500 hover:text-white p-3 rounded-xl"
                  >
                    Approve Termination
                  </button>

                </div>
              )}
              {(islandlord && agreementData.status === 3 && agreementData.landlordApprovalForCancellation === false) && (
                <div className="absolute top-6 right-10 md:flex">

                  <button
                    type="button"
                    className="text-red-500 border border-solid border-red-500  text-xl lg:text-2xl bg-red-50 hover:bg-red-500 hover:text-white p-3 rounded-xl"
                  >
                    Approve Termination
                  </button>

                </div>
              )}

            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-start w-full items-start place-content-start">
            {/* ----------Col-1----------------*/}
            <div className="flex flex-col gap-6 px-5 py-7  mr-2  md:w-1/3 relative">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap">
                  <ul className="flex flex-wrap  gap-2 text-black">

                    <li
                      // key={agreementData}
                      className="border text-accent border-slate-300 px-2 py-1 bg-accent/5 text-sm rounded-2xl"
                    >
                      <span className='font-bold'>Status : </span>{agreementData.status < 3 ? 'Pending' : agreementData.status === 3 ? 'Active' : agreementData.status === 4 ? 'Inactive' : agreementData.status === 5 && 'Cancelled'}
                    </li>
                  </ul>
                </div>
                <h1 className="text-lg "><span className='font-semibold'>Agreement Id :</span> {agreementData.agreementId}</h1>

                <div className="flex flex-col gap-2">
                  <h1 className="text-lg text-slate-900 font-medium">
                    Duration : {agreementData.durationMonths} months
                  </h1>
                  <h1 className="text-lg text-slate-400 font-medium">

                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg text-slate-900 font-medium">
                    Rent : {weiToPKR(agreementData.rentAmount)}/= Rs
                  </h1>
                  <h1 className="text-lg text-slate-400 font-medium">

                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg text-slate-900 font-medium">
                    Advance : {weiToPKR(agreementData.advancePayment)}/= Rs
                  </h1>
                  <h1 className="text-lg text-slate-400 font-medium">

                  </h1>
                </div>
              </div>
            </div>
            {/* ----------Col-2----------------*/}
            <div className="flex flex-col border-b md:border-b-0 md:border-l md:pl-2 border-slate-300 md:gap-6 md:w-2/3 pb-10">
              <div className="flex flex-col gap-2 px-5 py-7">
                {/* ---------Agreement Name------------ */}
                <h1 className="text-2xl font-semibold mb-3">
                  Extra Details/Requirements
                </h1>
                <p className="description">{agreementData.extraDetail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* keep thiss dialog component ouotside here so that it doesnt overlap with other components */}
        {/* render ConfirmationDialog only if selectedUID && deleteBtn are available */}

        {/* <ProjectDeleteConfirmationDialog
          cancel={() => setDeleteBtn(!deleteBtn)}
          deleteBtn={deleteBtn}
          setDeleteBtn={setDeleteBtn}
          propUid={selectedUID}
          onDeleteSuccess={handleDeleteSuccess}
        /> */}


        <div
          className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
            items-center border z-10 relative
           border-slate-300  bg-white/50 rounded-2xl my-6 mb-10"
        >
          <div className="flex w-full flex-col">
            <h1 className="text-2xl font-semibold px-5 pt-7 mb-1">Property Details</h1>
            {/* ---------TODO: Property Details------------ */}
            <div className=" py-5">

              <div className="flex w-full justify-between items-center py-5 relative border-t px-5 gap-5 border-slate-300" key={agreementData.propertyDetails._id}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-0">
                  <div className="flex items-start justify-start">
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${agreementData.propertyDetails.thumbnailImage}`}
                      alt=""
                      className="w-[30vw]  md:w-40 rounded-lg  object-cover aspect-video mr-8"
                    />

                  </div>
                  <div className="lg:w-[60%] md:pl-6">
                    <Link to={`/properties/${agreementData.propertyId}`} className="hidden md:flex text-xl font-semibold  hover:text-accent">{agreementData.propertyDetails.propertyType}</Link>
                    <div className="hidden md:flex place-content-start items-center w-full text-slate-600 gap-1">
                      {/* ------------------------ Project Description-------------------------- */}
                      <p><span className='font-bold'>Id : </span> {agreementData.propertyId}</p>
                    </div>
                    <p className="description   w-full md:w-[90%]">
                      <span className='font-bold'>Description : </span> {agreementData.propertyDetails.description}
                    </p>
                  </div>
                </div>



              </div>

            </div>
          </div>

        </div>
        {/* ----------Entities Involved------------ */}
        <div
          className="flex w-full lg:w-3/5 md:w-4/5 flex-col justify-center
            items-center border z-10 relative
           border-slate-300  bg-white/50 rounded-2xl my-6"
        >
          <div className="flex w-full flex-col">
            <h1 className="text-2xl font-semibold px-5 pt-7 mb-3">Individuals/Entities Involved</h1>
            <div className="py-5">
              {/* Landlord  */}
              <div className="flex w-full justify-between items-center py-5 relative border-t px-5 gap-5 border-slate-300">
                <div className="flex flex-col md:flex-row gap-2 md:gap-0">
                  <div className="flex items-center justify-start">
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${agreementData.landlord.displayPicture}`}
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
                        {agreementData.landlordWalletAddress}

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
                      <span className='font-bold'> Wallet : </span>{agreementData.landlordWalletAddress}
                    </div>

                  </div>
                </div>
              </div>
              {/* tenant  */}
              <div className="flex w-full justify-between items-center py-5 relative border-t px-5 gap-5 border-slate-300">
                <div className="flex flex-col md:flex-row gap-2 md:gap-0">
                  <div className="flex items-center justify-start">
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${agreementData.tenant.displayPicture}`}
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
                        {agreementData.tenantWalletAddress}

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
                      <span className='font-bold'> Wallet : </span>{agreementData.tenantWalletAddress}
                    </div>

                  </div>
                </div>
              </div>

              {/* //StateAgent  */}

              <div className="flex w-full justify-between items-center py-5 relative border-t px-5 gap-5 border-slate-300" >
                <div className="flex flex-col md:flex-row gap-2 md:gap-0">
                  <div className="flex items-center justify-start">
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${agreementData.stateAgent.displayPicture}`}
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
                        {agreementData.stateAgentWalletAddress}

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
                      <span className='font-bold'> Wallet : </span>{agreementData.stateAgentWalletAddress}
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
        {/* ----------END  Agreement Reviews------------ */}


      </div>
    ) : (
      <div className="flex w-full py-10 justify-center text-slate-500">
        <img alt="loader" src={loading} />
      </div>
    )
  );
}

export default AgreementDetails;
