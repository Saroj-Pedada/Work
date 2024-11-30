import React from 'react';

const EmployeeCard = ({ employee }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white notime:bg-gray-800">
            <h2 className="text-lg font-bold mb-2">{employee.name}</h2>
            <p>Designation: {employee.designation}</p>
            <p>Phone: {employee.phone}</p>
            <p>Village: {employee.village}</p>
        </div>
    );
};

export default EmployeeCard;
