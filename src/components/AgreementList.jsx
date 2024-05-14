import { Link } from 'react-router-dom';
import React from 'react';


const AgreementList = ({ agreementsProp = [] }) => {
  const isStateAgent = localStorage.getItem("Isstateagent")
  const islandlord = localStorage.getItem("Islandlord")
  const isTenanat = localStorage.getItem("Istenant")

  let limitedagreements;
  if (!isStateAgent && !islandlord && !isTenanat) {
    // const maxToShow = 4;
    limitedagreements = agreementsProp.slice(0, 4);
  } else {
    limitedagreements = agreementsProp;
  }

  function pkrToWei(pkrAmount) {
    const etherPriceInPKR = 810483; // Current price of 1 Ether in PKR
    const weiPerEther = 10 ** 18; // 1 Ether equals 10^18 wei

    // Convert PKR to Ether
    const etherAmount = pkrAmount / etherPriceInPKR;

    // Convert Ether to wei
    const weiAmount = etherAmount * weiPerEther;

    return weiAmount;
  }
  // Function to convert Wei to PKR format
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



  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }


  return limitedagreements.map((agreement) => {
    // console.log('developer >>>>>', developer);
    const {
      agreementId, rentAmount, durationMonths, status, propertyId, estateName, thumbnail
    } = agreement;
    return (
      <React.Fragment key={agreementId}>
        {/* ---------------- Project List--------------- */}
        <Link
          to={`/agreements/${agreementId}`}
          className="flex flex-col items-start gap-3 p-5 hover:bg-slate-100 cursor-pointer border-t w-full relative"
        >
          <div className="flex  flex-col lg:flex-row w-full gap-6 items-center relative">
            <img
              // eslint-disable-next-line camelcase
              src={`https://gateway.pinata.cloud/ipfs/${thumbnail}`}
              className="aspect-video md:w4 h-40 object-cover rounded-lg"
              alt=""
            />
            <div className="flex flex-col w-full">
              {/* ------------ Agreement Name------------- */}
              <div className="flex text-base  text-start font-normal gap-3 items-start">
                <p className="text-base font-medium">
                  Rs.
                  {' '}
                  {weiToPKR(rentAmount)}
                  {' '}
                  <br />
                  {' '}
                  <span className="text-sm font-light text-slate-600">
                    Rent Amount
                  </span>
                </p>
              </div>


              <div className="flex my-5">
                <div className="flex flex-col w-1/2 items-start justify-start gap-3">
                  <div>
                    <h3 className="listing-content-data">propertyId</h3>
                    <h4 className="listing-content-constant company-propertyId">
                      {propertyId}
                    </h4>
                  </div>
                  <div>
                    <h3 className="listing-content-data">duration</h3>
                    <h4 className="listing-content-constant company-propertyId">
                      {durationMonths}{" "}{durationMonths == 1 ? 'month' : 'months'}
                    </h4>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 items-start justify-start gap-3">
                  <div>
                    <h3 className="listing-content-data">Status</h3>
                    <h4 className="listing-content-constant">{status < 3 ? 'Pending' : status === 3 ? 'Active' : status === 4 ? 'Inactive' : status === 5 && 'Cancelled'}</h4>
                  </div>
                  <div>
                    <h3 className="listing-content-data">Created By</h3>
                    <h4 className="listing-content-constant">{estateName}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="flex border  bg-accent/5 shadow-sm p-2 text-sm px-2 py-1 rounded-xl">
            Agreement Id : {agreementId}
          </div>

        </Link>
      </React.Fragment>
    );
  });
};

export default AgreementList;
