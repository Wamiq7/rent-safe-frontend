import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import SearchHero from '../components/SearchHero';
import SearchAboutSection from '../components/SearchAboutSection';


function Search() {

  const [properties, setproperties] = useState([]);
  const [floorType, setFloorType] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [filteredProperties, setFilteredproperties] = useState([]);

  const fetchproperties = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/property/getAllProperties`
      );
      const propertiesData = await response.json();
      setproperties(propertiesData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchproperties();
  }, []);

  const filterProperties = () => {
    return properties
      .filter((property) => {

        console.log("Running")
        // Filter by searchInput in description
        if (address && !property.propertyAddress.toLowerCase().includes(address.toLowerCase())) {
          return false;
        }
        if (city && !property.cityArea.toLowerCase().includes(city.toLowerCase())) {
          return false;
        }

        // Filter by floor
        if (floorType?.property && property.propertyType !== floorType?.property) {
          return false;
        }
        // Filter by rent amount
        const rentAmountPKR = weiToPKR(property.rentAmount);
        if (minAmount && maxAmount) {
          if (rentAmountPKR < minAmount || rentAmountPKR > maxAmount) {
            return false;
          }
        }
        return true;
      })
  };

  function weiToPKR(weiAmount) {
    const pkrAmount = weiAmount * 1000;
    return pkrAmount;
  }

  useEffect(() => {
    console.log("useeffect running", floorType.label)
    if (address || city || floorType || minAmount || maxAmount) {
      const filtered = filterProperties();
      setFilteredproperties(filtered)
    } else {
      setFilteredproperties(properties)
    }
  }, [address, city, minAmount, maxAmount, floorType, properties]);


  return (
    <>
      <div className="flex flex-col w-full justify-center">
        <SearchHero floorType={floorType} setFloorType={setFloorType} setAddress={setAddress} setCity={setCity} setMinAmount={setMinAmount} setMaxAmount={setMaxAmount}/>
        <SearchAboutSection properties={filteredProperties} />
      </div>
      <Footer />
    </>
  );
}

export default Search;
