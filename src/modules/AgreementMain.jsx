import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AgreementsDetails from '../components/AgreementDetails';

function AgreementMain() {
  const { agreementId } = useParams();
  const [AgreementData, setAgreementData] = useState({});

  const fetchAgreements = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/agreements/getAgreementById/${agreementId}`);
      const agreement = await response.json();
      setAgreementData(agreement)

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchAgreements();
  }, [agreementId]);


  return (
    <div>
      <AgreementsDetails
        agreementData={AgreementData}
      />
    </div>
  );
}

export default AgreementMain;
