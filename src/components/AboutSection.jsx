import { TiHeartFullOutline } from 'react-icons/ti';
import AboutCard from './AboutCard';
import Image1 from '../../public/recentproperty/img1.png';
import Image2 from '../../public/recentproperty/img2.png';
import Image3 from '../../public/recentproperty/img3.png';
import Image4 from '../../public/recentproperty/img4.png';
import Image5 from '../../public/recentproperty/img5.png';
// import Image from "../../public/developers/img1.jpg";

export default function AboutSection() {
  return (
    <section className="flex flex-col items-center justify-center  bg-[url('/bgsvg.svg')]  min-h-[50vh] w-full">
      <div className=" flex flex-col items-center filter w-full  py-24 h-full bg-white/70">
        <h1 className="text-5xl blue-gradient font-semibold drop-shadow-lg ">
          Checkout the Recently listed properties
        </h1>
        <div className="flex flex-col md:flex-row z-49 p-6 gap-10 justify-between items-center w-[100%]">
          <AboutCard
            image={Image1}
            name = "Pearl Luxury"
            location = "Maymar"
            price = "85,000"
            type= "Apartment"
            category= "For rent"
          />
          <AboutCard
            image={Image2}
            name = "Apsara"
            location = "Nazimabad"
            price = "60,000"
            type= "Apartment"
            category= "For rent" 
          />
          <AboutCard
            image={Image3}
            name = "Bridge View"
            location = "Gulshan"
            price = "75,000"
            type= "Apartment"
            category= "For rent"
          />
           <AboutCard
            image={Image4}
            name = "Sky Tower"
            location = "Bahria Town"
            price = "54,000"
            type= "Apartment"
            category= "For rent"
          />
           {/* <AboutCard
            image={Image5}
            name = "Sumaira Heights"
            location = "Johar"
            price = "Rent : 77,000"
            type= "appartment"
            category= "For rent"
          /> */}
        
        </div>
      </div>
    </section>
  );
}
