import AboutCard from './AboutCard';

import { useEffect, useState } from 'react';



export default function AboutSection() {

  const [properties, setproperties] = useState([])
  const fetchproperties = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/property/getRecentlyProperties`);
      const propertiesData = await response.json();
      setproperties(propertiesData)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchproperties();
  }, []);

  console.log(properties);
  function weiToPKR(weiAmount) {
    const etherPriceInPKR = 810483; // Current price of 1 Ether in PKR
    const weiPerEther = 10 ** 18; // 1 Ether equals 10^18 wei

    // Convert wei to Ether
    const etherAmount = weiAmount / weiPerEther;

    // Convert Ether to PKR
    const pkrAmount = etherAmount * etherPriceInPKR;

    return pkrAmount;
  }

  return (
    <section className="flex flex-col items-center justify-center  bg-[url('/bgsvg.svg')]  min-h-[50vh] w-full">
      <div className=" flex flex-col items-center filter w-full  py-24 h-full bg-white/70">
        <h1 className="text-5xl blue-gradient font-semibold drop-shadow-lg ">
          Checkout the Recently listed properties
        </h1>
        <div className="flex flex-col md:flex-row z-49 p-6 gap-10 justify-between items-center w-[100%]">
          {/* {
            properties && properties?.map((item) => {
              return (
                <AboutCard
                  key={item.propertyId} // Added key prop for optimization
                  image={`https://gateway.pinata.cloud/ipfs/${item.thumbnail}`}
                  name={item.propertyType}
                  location={item.cityArea}
                  price={weiToPKR(item.rentAmount)}
                  type={item.estateName}
                  category="For rent"
                  id={item.propertyId}
                />
              );
            })
          } */}
        </div>


      </div>
    </section>
  );
}
