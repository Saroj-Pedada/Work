import React, { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';
import HttpnInstance from '../Api/nodeapi';

function Employees() {
  const [search, setSearch] = useState('');
  const [employee, setEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await HttpnInstance.post('/user/getEmployees');
      if (response.data.length > 0) {
        setEmployees(response.data);
      } else {
        alert('No employees found');
      }
    } catch (error) {
      console.log('Error fetching employees:', error);
      alert('Error fetching employees')
    }
  };

  const handleSearch = () => {
    const foundEmployee = employees.find((emp) => emp.emp_id === search);
    setEmployee(foundEmployee || null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Search
        </button>
      </div>

      {employee ? (
        <EmployeeCard employee={employee} />
      ) : (
        <p className="text-gray-500">
          {
            //No employee found. Please search by a valid Employee ID.
          }
        </p>
      )}
    </div>
  );
}

export default Employees;
