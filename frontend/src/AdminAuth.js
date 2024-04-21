import ViewRegistration from "./Components/Admin/viewRegistration"; 
import Footer from "./Components/Common/Footer";
import AdminHeader from "./Components/Admin/AdminHeader";
import ManageHospitals from "./Components/Admin/ManageHospitals";
import ManageCamps from "./Components/Admin/ManageCamps";
import Auth from "./Components/Admin/Auth";
import ManageEmployees from "./Components/Admin/ManageEmployees";
import ViewDonation from "./Components/Admin/ViewDonation";
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
            {active === 5 && <ViewDonation/>}
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
