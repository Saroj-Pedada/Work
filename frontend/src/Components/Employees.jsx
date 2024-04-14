import React , {useState, useEffect} from 'react'
import HttpnInstance from './Api/nodeapi'

function Employees() {
  const [Employees, setEmployees] = useState([])

  useEffect(() => {
    try {
      HttpnInstance.post('/employee/getEmployees').then((response) => {
        console.log(response.data)
        setEmployees(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className='p-5 h-full w-full flex flex-col items-center'>
    <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-5 h-64 justify-between'>
      {Employees.map((employee) => (
        <div className="bg-white rounded-xl ring-2 ring-inset ring-[#3940ff] p-5" key={employee._id}>
          <p>Name: {employee.Name}</p>
          <p>Designation: {employee.Designation}</p>
          <p>Phone: {employee.PhoneNumber}</p>
          <p>Location: {employee.Location}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Employees