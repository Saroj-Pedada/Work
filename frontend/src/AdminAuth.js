import Admin from "./Components/Admin";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Auth from "./Components/Auth";
import React, { useEffect, useState } from "react";

function AdminAuth() {
  const [active, setActive] = useState(1);

  return (
    <>
      <Header setActive={setActive} />
      <div className="bg-[url('./images/image.png')] bg-cover bg-no-repeat overflow-hidden min-h-screen w-full flex flex-col">
        {active === 1 && <Auth />}
        {active === 2 && <Admin />}
      </div>
      <Footer />
    </>
  );
}

export default AdminAuth;