// App.js
import React, { useEffect, useState } from 'react';
import User from './Components/Users/User';
import Employee from './Components/Employee/Employee';
import Admin from './Components/Admin/Admin';
import Home from './Components/Common/Home';
import Login from './Components/Common/Login';
import Register from './Components/Common/Register';
import Donate from './Components/Common/Donate';
import Header from './Components/Common/Header';
import AdminHeader from './Components/Admin/AdminHeader';
import EmployeeHeader from './Components/Employee/EmployeeHeader';
import UserHeader from './Components/Users/UserHeader';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [varReload, setVarReload] = useState(false);
  useEffect(() => {
    let userRole = Cookies.get('user');
    if (userRole) {
      try {
        let decodedToken = jwtDecode(userRole);
        setUserRole(decodedToken.access_level == 0 ? 'admin' : decodedToken.access_level == 1 ? 'employee' : 'user');
      } catch (error) {
        console.error(error);
        Cookies.remove('user');
        setUserRole(null);
      }
    }
  }, [varReload]);

  // const employeeRoles = ["workRegistration", "profile"];
  // const adminRoles = ["registrations", "camps", "hospitals", "employees", "donations", "work", "profile"];
  // const userRoles = ["camps", "hospitals", "employees", "profile"];

  const [varEmployeeRoles, setVarEmployeeRoles] = useState("workRegistration");
  const [varAdminRoles, setVarAdminRoles] = useState("registrations");
  const [varUserRoles, setVarUserRoles] = useState("camps");

  // Render the correct view based on user role
  const renderDashboard = () => {
    switch (userRole) {
      case 'register':
        return <><Header setUserRole={setUserRole} /><Register /></>
      case 'donate':
        return <><Header setUserRole={setUserRole} /><Donate /></>
      case 'login':
        return <><Header setUserRole={setUserRole} /><Login setVarReload={setVarReload} varReload={varReload} /></>
      case 'user':
        return <><UserHeader setUserRole={setUserRole} setVarUserRoles={setVarUserRoles} /><User varUserRoles={varUserRoles} /></>;
      case 'employee':
        return <><EmployeeHeader setUserRole={setUserRole} setVarEmployeeRoles={setVarEmployeeRoles} /><Employee varEmployeeRoles={varEmployeeRoles} /></>;
      case 'admin':
        return <><AdminHeader setUserRole={setUserRole} setVarAdminRoles={setVarAdminRoles} /><Admin varAdminRoles={varAdminRoles} /></>;
      default:
        return <><Header setUserRole={setUserRole} /><Home setUserRole={setUserRole} /></>;
    }
  };

  return <div className="min-h-screen flex items-center justify-center">{renderDashboard()}</div>;
}

export default App;