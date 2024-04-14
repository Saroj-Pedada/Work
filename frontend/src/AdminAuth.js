import ViewRegistration from "./Components/viewRegistration"; 
import Footer from "./Components/Footer";
import AdminHeader from "./Components/AdminHeader";
import ManageHospitals from "./Components/ManageHospitals";
import ManageCamps from "./Components/ManageCamps";
import Auth from "./Components/Auth";
import ManageEmployees from "./Components/ManageEmployees";
import React, { useEffect, useState } from "react";

function AdminAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <>
      <AdminHeader
        loggedIn={loggedIn}
        setActive={setActive}
        setLoggedIn={setLoggedIn}
      />
      <div className="bg-[url('./images/image.png')] bg-cover bg-no-repeat overflow-hidden min-h-screen w-full flex flex-col">
        {loggedIn ? (
          <>
            {active === 1 && <ViewRegistration />}
            {active === 2 && <ManageCamps />}
            {active === 3 && <ManageHospitals />}
            {active === 4 && <ManageEmployees />}
          </>
        ) : (
          <Auth setLoggedIn={setLoggedIn} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default AdminAuth;
