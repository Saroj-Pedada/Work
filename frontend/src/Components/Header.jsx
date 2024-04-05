import React from 'react'

function Header() {
  return (
    <div className='w-full text-white bg-gradient-to-r from-teal-500 to-emerald-400 items-center justify-center flex flex-col h-10'>
      <div className='w-full flex flex-row items-center justify-between lg:px-5 md:gap-x-5 sm:gap-x-2 gap-x-1 px-3'>
        <div className='lg:text-xl'>
          NGO Organisation
        </div>
        <div>
          {/* List of Links */}
          <ul className='flex flex-row lg:gap-x-10 md:gap-x-5 sm:gap-x-3 gap-x-2'>
            <li>Register</li>
            <li>Camps</li>
            <li>Hospitals</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header