import React from 'react'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'

const navigation = [
    { name: 'Work' },
    { name: 'Profile' },
]

function EmployeeHeader(props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <div className="-m-1.5 p-1.5">
                            <span className="sr-only">CSM Multipurpose Organisation</span>
                            <img
                                alt=""
                                src="favicon.ico"
                                className="h-8 w-auto"
                            />
                        </div>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <div key={item.name} onClick={() => props.setVarEmployeeRoles(item.name.toLowerCase())} className="text-sm/6 font-semibold text-gray-900">
                                {item.name}
                            </div>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <div onClick={() => { Cookies.remove('user'); props.setUserRole('login') }} className="text-sm/6 font-semibold text-gray-900">
                            Log out <span aria-hidden="true">&rarr;</span>
                        </div>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <div className="-m-1.5 p-1.5">
                                <span className="sr-only">CSM Multipurpose Organisation</span>
                                <img
                                    alt=""
                                    src="favicon.ico"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <div
                                            key={item.name}
                                            onClick={() => { props.setVarEmployeeRoles(item.name.toLowerCase()); setMobileMenuOpen(false) }}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <div
                                        onClick={() => { Cookies.remove('user'); props.setUserRole('login') }}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        Log out
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </>
    )
}

export default EmployeeHeader