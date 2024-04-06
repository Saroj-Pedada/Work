import AboutUs from "./Components/AboutUs";
import Camps from "./Components/Camps";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Hospitals from "./Components/Hospitals";
import Registration from "./Components/Registration";
import React, { useEffect, useState } from "react";

function App() {
  const [active, setActive] = useState(1);
  
  return (
    <div className="bg-[url('./images/image.png')] bg-cover bg-no-repeat overflow-hidden h-full w-full flex flex-col">
      <Header active={active} setActive={setActive}/>
      {active === 1 && <Registration/>}
      {active === 2 && <Camps/>}
      {active === 3 && <Hospitals/>}
      {active !== 1 && active !== 2 && active !== 3 && <AboutUs/>}
      <Footer />
    </div>
  );
}

export default App;
