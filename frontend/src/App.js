import AboutUs from "./Components/AboutUs";
import Camps from "./Components/Camps";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Hospitals from "./Components/Hospitals";
import Registration from "./Components/Registration";
import Employees from "./Components/Employees";
import React, { useState } from "react";

function App() {
  const [active, setActive] = useState(1);

  return (
    <>
      <Header setActive={setActive} />
      <div className="bg-[url('./images/image.png')] bg-cover bg-no-repeat overflow-hidden min-h-screen w-full flex flex-col">
        {active === 1 && <Registration />}
        {active === 2 && <Camps />}
        {active === 3 && <Hospitals />}
        {active === 5 && <Employees />}
        {active === 4 && <AboutUs />}
      </div>
      <Footer />
    </>
  );
}

export default App;