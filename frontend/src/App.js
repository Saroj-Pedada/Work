import AboutUs from "./Components/User/AboutUs";
import Camps from "./Components/User/Camps";
import Footer from "./Components/Common/Footer";
import Header from "./Components/User/Header";
import Hospitals from "./Components/User/Hospitals";
import Registration from "./Components/User/Registration";
import Employees from "./Components/User/Employees";
import Donation from "./Components/User/Donation";
import React, { useState } from "react";

function App() {
  const [active, setActive] = useState(1);

  return (
    <>
      <Header setActive={setActive} />
      <div className="bg-blue-200 bg-cover bg-no-repeat overflow-hidden min-h-screen w-full flex flex-col">
        {active === 1 && <Registration />}
        {active === 2 && <Camps />}
        {active === 3 && <Hospitals />}
        {active === 4 && <Donation />}
        {active === 5 && <Employees />}
        {active === 6 && <AboutUs />}
      </div>
      <Footer />
    </>
  );
}

export default App;