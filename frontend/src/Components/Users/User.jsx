import React from 'react'
import Camps from './Camps';
import Hospitals from './Hospitals';
import Employees from './Employees';
import Profile from '../Common/Profile';

// const userRoles = ["camps", "hospitals", "employees", "profile"];

function User({ varUserRoles }) {
    return (
        varUserRoles === "camps" ? <Camps /> : varUserRoles === "hospitals" ? <Hospitals /> : varUserRoles === "employees" ? <Employees /> : <Profile />
    )
}

export default User