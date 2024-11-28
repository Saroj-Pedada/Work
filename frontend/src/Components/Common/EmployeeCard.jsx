import React from 'react';

const EmployeeCard = ({ employee, onDelete }) => {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{employee.name}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Designation: {employee.designation}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Phone: {employee.phone}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Village: {employee.village}</p>
            <a href="#" onClick={() => onDelete(employee.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Delete
            </a>
        </div>
    );
};

export default EmployeeCard;