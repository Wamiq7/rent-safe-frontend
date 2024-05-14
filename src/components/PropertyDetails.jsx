import { Link, useParams } from 'react-router-dom';
import { BiSolidMap } from 'react-icons/bi';
import { FaCircleDollarToSlot } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import Container from './Container';
import Members from './Members';
import loading from "../../public/SVG/loading.svg";
import { RiArrowRightSLine } from "react-icons/ri";
import '../styles/index.css';
import { Pannellum } from 'pannellum-react';
import ABI from '../../src/contracts/PropertyListing.sol/PropertyListing.json'
function PropertyDetails() {
  const propertyListingAddress = import.meta.env.VITE_PROPERTY;
  const { propertyId, listingDate } = useParams();
  const [property, setProperty] = useState(null);
  const isStateAgent = localStorage.getItem("Isstateagent") === 'true';
  const islandlord = localStorage.getItem("Islandlord") === 'true';


  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.imageLinks.length);
  };



  const delistProperty = async (id, stateAgent) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(propertyListingAddress, ABI.abi, signer);
      const transaction = await contract.delistProperty(id, stateAgent);

      const receipt = await transaction.wait();
      console.log(" Delisted Successfully", receipt);
      toast.success(" Delisted Successfully");
    } catch (error) {
      console.error("Error delisting property:", error);
      toast.error("Error delisting property.", {
        position: toast.POSITION.TOP_CENTER, autoClose: 10000,
      });
    }

  }

  const fetchProperty = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/property/getProperty/${propertyId}`);
      const propertiesData = await response.json();
      setProperty(propertiesData)

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchProperty();
  }, [propertyId]);

  if (!property || !Object.keys(property).length) {
    return (
      <div className="flex w-full py-10 justify-center text-slate-500">
        <img alt="loader" src={loading} />
      </div>
    );
  }
  function weiToPKR(weiAmount) {
    // const etherPriceInPKR = 810483; // Current price of 1 Ether in PKR
    // const weiPerEther = 10 ** 18; // 1 Ether equals 10^18 wei

    // // Convert wei to Ether
    // const etherAmount = weiAmount / weiPerEther;

    // Convert Ether to PKR
    // const pkrAmount = etherAmount * etherPriceInPKR;
    const pkrAmount = weiAmount * 1000;

    return pkrAmount;
  }

  return (
    <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3 relative">
      <Container>
        <div className="flex w-full items-center justify-start flex-col md:flex-row relative">
          <div className="flex w-full items-center justify-center md:items-start md:justify-start px-5 md:w-auto ">
            <img
              alt="property"
              src={`https://gateway.pinata.cloud/ipfs/${property?.thumbnail}`}
              className="aspect-video  mb-2 w-full  md:h-44 max  object-cover rounded-lg"
            />
          </div>
          {/* Heading */}
          <div className="flex flex-col w-full md:w-auto justify-start items-start  md:ml-0">
            {/* <h1 className="text-2xl px-6 text-start font-medium text-slate-800 mb-6 ">
              {property?.title}
            </h1> */}
            {/* Domain */}
            <Link
              className="text-accent px-6 my-2 text-base font-medium underline truncate"
            >
              Posted by
              {' '}
              {property?.stateAgent}
            </Link>
            {/* Timestamp */}
            <p className="text-sm px-6 text-slate-600">
              Posted on
              {' '}
              {listingDate}
            </p>
            <div className="flex px-6 flex-col my-5 gap-2">
              {/* City */}
              <p className="text-base flex items-center gap-2 text-slate-800">
                <BiSolidMap className="text-accent" />
                {' '}
                {property?.propertyAddress}
              </p>
              <p className="text-base flex items-center gap-2 text-slate-800">
                <BiSolidMap className="text-accent" />
                {' '}
                {property?.cityArea}
              </p>

            </div>
          </div>
        </div>

        <div className="flex w-full border-t py-3">
          {/* description */}
          <h1 className="description px-6">{property?.description}</h1>
        </div>
        {/* Pricing */}
        <div className="flex justify-start gap-8 w-full border-t pt-3 pb-6">
          <div className="flex text-base px-6 text-start font-normal gap-3 items-start">
            <FaCircleDollarToSlot className="text-accent mt-2" />
            <p className="text-base font-medium">
              Rs.
              {' '}
              {weiToPKR(property?.rentAmount)}
              {' '}
              <br />
              {' '}
              <span className="text-sm font-light text-slate-600">
                Rent Amount
              </span>
            </p>
          </div>
          {/* Experience Level */}
          <div className="flex text-base px-6 text-start font-normal gap-3 items-start">
            <p className="text-base font-medium">
              {listingDate}
              {' '}
              <br />
              {' '}
              <span className="text-sm font-light text-slate-600">
                Listed Date
              </span>
            </p>
          </div>
          <div className="flex text-base px-6 text-start font-normal gap-3 items-start">
            <p className="text-base font-medium">
              {property?.floor}
              {' '}
              <br />
              {' '}
              <span className="text-sm font-light text-slate-600">
                Floor
              </span>
            </p>
          </div>
          <div className="flex text-base px-6 text-start font-normal gap-3 items-start">
            <p className="text-base font-medium">
              {property?.propertyType}
              {' '}
              <br />
              {' '}
              <span className="text-sm font-light text-slate-600">
                Floor
              </span>
            </p>
          </div>
        </div>
        <div className="flex w-full border-t py-3">
          {/* Contract type */}
          <p className="text-base capitalize px-6 text-start font-normal text-slate-800">
            <span className=" font-medium">Property Status:</span>
            {' '}
            {property?.status === 0 ? 'Pending' : property?.status === 1 ? 'Listed' : property?.status === 2 ? 'Rented' : 'Delisted'}
            {' '}
          </p>
        </div>


        {/* chatgpt do here */}

        <div className="flex justify-center items-center w-full my-5">
          <div className="bg-white shadow-lg border border-gray-300 rounded-lg overflow-hidden max-w-4xl w-full mx-auto h-500px">
            <Pannellum
              width="100%"
              height="500px"
              image={`https://gateway.pinata.cloud/ipfs/${property.imageLinks[currentImageIndex]}`}
              pitch={10}
              yaw={180}
              hfov={110}
              autoLoad
              showZoomCtrl={true}
            />
            <button onClick={handleNext} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Next
            </button>
            <p>Current image index: {currentImageIndex + 1} / {property.imageLinks.length}</p>
          </div>
        </div>



        <div className="flex flex-col md:flex-row md:gap-10 gap-6 w-full border-t py-3 px-6">
          <div className="flex flex-col items-start justify-start gap-3">
            <h1
              className="text-xl font-semibold text-slate-800"
            >
              Property Owner
            </h1>
            <Members
              image={`/public/stateagent/stateagent1.jpg`}
              walletAddress={`${property?.ownerWallet}`}

              className="font-medium"
              imageclass="w-[10vw] md:w-14"
            />
          </div>
          {/* <div className="flex flex-col items-start justify-start gap-3">
            <h1
              className="text-xl font-semibold text-slate-800"
            >
              Tenant
            </h1>

            <Members
              image={`${property?.tenant.image}`}
              walletAddress={`${property?.tenant.walletAddress}`}
              name={`${property?.tenant.name}`}
              cnic={`${property?.tenant.cnic}`}
              className="font-medium"
              imageclass="w-[10vw] md:w-14"
            />

          </div> */}
          <div className="flex flex-col items-start justify-start gap-3">
            <h1
              className="text-xl font-semibold text-slate-800"
            >
              State Agent
            </h1>

            <Members
              // to={}
              image={`/public/stateagent/stateagent1.jpg`}
              walletAddress={property?.stateAgent}
              name={property?.stateAgentDetails.name}
              className="font-medium truncate "
              imageclass="w-[10vw] md:w-14 "
            />

          </div>
        </div>

      </Container>

      {isStateAgent && (<div className="flex  2xl:flex-col md:relative 2xl:absolute 2xl:w-96 md:w-4/5 2xl:bg-transparent 2xl:-top-[59%] 2xl:right-[21%] fixed bottom-0 bg-white gap-5 w-full border-t md:border-0 md:bottom-4 border-slate-300 py-2 items-center justify-center z-10 px-3">
        <div className="flex justify-between  items-center cursor-pointer ">
          <button
            onClick={() => delistProperty(propertyId, property?.stateAgent)}
            type="button"
            className="text-red-500 border border-solid border-red-300 text-l w-[11.7rem] lg:text-xl bg-red-50 hover:bg-red-500 hover:text-white p-3 rounded-[7px]"
          >
            Delist Property
          </button>
        </div>
        <div className="flex justify-between  items-center cursor-pointer bg-accent hover:bg-accent/50 rounded-lg text-white font-semibold text-center">
          <a
            href={`/agreements/create/${propertyId}`}
            className="flex p-3 md:p-4 items-center justify-center"
          >
            Create Agreement
            <RiArrowRightSLine className="ml-2 text-md" />
          </a>
        </div>

      </div>)}
    </div>





  );
}

export default PropertyDetails;
