import AboutUs from "./Components/User/AboutUs";
import Camps from "./Components/User/Camps";
import Footer from "./Components/Common/Footer";
import Header from "./Components/User/Header";
import Hospitals from "./Components/User/Hospitals";
import Registration from "./Components/User/Registration";
import Employees from "./Components/User/Employees";
import Donation from "./Components/User/Donation";
import WorkRegistration from "./Components/User/WorkRegistration";
import React, { useState, useEffect } from "react";

function App() {
  const [active, setActive] = useState(1);

  const [showWorkRegistration, setShowWorkRegistration] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    console.log("Current time:",currentTime)// Get the current hour
    setShowWorkRegistration(currentTime >= 17 && currentTime < 22); // Check if between 5pm and 10pm

    // Optional: Update visibility on time changes
    const handleTimeChange = () => {
      setShowWorkRegistration(currentTime >= 17 && currentTime < 22);
    };
    const intervalId = setInterval(handleTimeChange, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []); // Empty dependency array to run only on initial render

  return (
    <>
      <Header setActive={setActive} />
      <div className="bg-blue-200 bg-cover bg-no-repeat overflow-hidden min-h-screen w-full flex flex-col">
        {active === 1 && <Registration />}
        {active === 2 && <Camps />}
        {active === 3 && <Hospitals />}
        {active === 4 && <Donation />}
        {active === 5 && <Employees />}
        {showWorkRegistration && active === 7 && <WorkRegistration />}
        {active === 6 && <AboutUs />}
      </div>
      <Footer />
    </>
  );
}

export default App;
