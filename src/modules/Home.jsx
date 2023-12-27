import React from 'react';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import AboutUs from '../modules/AboutUs';


function Home() {
  return (
    <>
      <div className="flex flex-col w-full justify-center">

        <AboutUs/>
        <AboutSection />
      </div>
      <Footer />
    </>
  );
}

export default Home;
