import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyDetails from '../components/CompanyDetails';
import agreementsData from "../components/demo.json"

function CompanyMain() {
  const { uid } = useParams();
  const [AgreementData, setAgreementData] = useState({});


  useEffect(() => {
    // Simulate fetching data from the API based on UID
    if (uid && agreementsData.AgreementData) {
      // Find the agreement with the matching _id
      const agreement = agreementsData.AgreementData.find(item => item._id === uid);
  
      // Check if the agreement is found
      if (agreement) {
        setAgreementData(agreement);
      }
    }
  }, [uid, agreementsData.AgreementData]);
  

  return (
    <div>
      <CompanyDetails
        agreementData={AgreementData}
      />
    </div>
  );
}

export default CompanyMain;
