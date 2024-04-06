// import React from 'react'

// function Header(props) {
//   return (
//     <div className='mt-3 w-full text-white items-center justify-center flex flex-col h-10'>
//       <div className='w-full flex flex-row items-center justify-between lg:px-5 md:gap-x-5 sm:gap-x-2 gap-x-1 px-3'>
//         <div className='text-black font-black lg:text-2xl text-lg'>
//           NGO Organisation
//         </div>
//         <div>
//           {/* List of Links */}
//           <ul className='text-black font-semibold lg:text-xl flex flex-row lg:gap-x-10 md:gap-x-5 sm:gap-x-3 gap-x-2 text-lg'>
//             <li><a onClick={() => props.setActive(1)} className="p-2 drop-shadow-xl rounded-3xl">Register</a></li>
//             <li><a onClick={() => props.setActive(2)} className="p-2 drop-shadow-xl rounded-3xl">Camps</a></li>
//             <li><a onClick={() => props.setActive(3)} className="p-2 drop-shadow-xl rounded-3xl">Hospitals</a></li>
//             <li><a onClick={() => props.setActive(4)} className="p-2 drop-shadow-xl rounded-3xl">About Us</a></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Header

import React, { useState } from 'react';

function Header(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='bg-blue-900 text-white py-4'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='text-lg font-semibold'>
            NGO Organisation
          </div>
          <button className='lg:hidden focus:outline-none' onClick={toggleMenu}>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
            </svg>
          </button>
          <div className={`${menuOpen ? 'block absolute w-screen h-full bg-black top-0' : 'hidden'} lg:flex flex-grow lg:items-center justify-end`}>
            <ul className='flex flex-col lg:flex-row lg:gap-5'>
              <li><a onClick={() => { props.setActive(1); toggleMenu(); }} className='hover:text-gray-300 cursor-pointer'>Register</a></li>
              <li><a onClick={() => { props.setActive(2); toggleMenu(); }} className='hover:text-gray-300 cursor-pointer'>Camps</a></li>
              <li><a onClick={() => { props.setActive(3); toggleMenu(); }} className='hover:text-gray-300 cursor-pointer'>Hospitals</a></li>
              <li><a onClick={() => { props.setActive(4); toggleMenu(); }} className='hover:text-gray-300 cursor-pointer'>About Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
