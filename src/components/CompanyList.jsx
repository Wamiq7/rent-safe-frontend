import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import React from 'react';


const CompanyList = ({ organizationsProp = [] }) => {
  const authToken = localStorage.getItem("authToken");

  let limitedOrganizations;
  if (!isStateAgent && !islandlord && !isTenanat) {
    // const maxToShow = 4;
    limitedOrganizations = organizationsProp.slice(0, 4);
  } else {
    limitedOrganizations = organizationsProp;
  }

  return limitedOrganizations.map((organization) => {
    // console.log('developer >>>>>', developer);
    const {
      // eslint-disable-next-line camelcase
      _id, title, stateAgent, duration, propertyId, banner_img,
    } = organization;
    return (
      <React.Fragment key={_id}>
        {/* ---------------- Project List--------------- */}
        <Link
          to={`/agreements/${_id}`}
          className="flex flex-col items-start gap-3 p-5 hover:bg-slate-100 cursor-pointer border-t w-full relative"
        >
          <div className="flex  flex-col lg:flex-row w-full gap-6 items-center relative">
            <img
              // eslint-disable-next-line camelcase
              src={banner_img}
              className="aspect-video md:w4 h-40 object-cover rounded-lg"
              alt=""
            />
            <div className="flex flex-col w-full">
              {/* ------------ Company Name------------- */}
              <h1 className="text-xl font-medium text-slate-900">{title}</h1>


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
                      {duration} months
                    </h4>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 items-start justify-start gap-3">
                  <div>
                    <h3 className="listing-content-data">Created By</h3>
                    <h4 className="listing-content-constant">{stateAgent.estateName}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="flex border  bg-accent/5 shadow-sm p-2 text-sm px-2 py-1 rounded-xl">
            Agreement Id : {_id}
          </div>

        </Link>
      </React.Fragment>
    );
  });
};

export default CompanyList;
