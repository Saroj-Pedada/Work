import React, { useState, useEffect } from 'react';
import HttpnInstance from '../Api/nodeapi';
import LoadingAnim from '../Common/LoadingAnim';

function President() {
    const [varPresidents, setVarPresidents] = useState([]);
    const [varAddOverlay, setVarAddOverlay] = useState(false);
    const [varNoData, setVarNoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [varNewPresident, setVarNewPresident] = useState({
        president_name: '',
        president_phone: '',
        village: '',
        taluka: '',
        district: '',
        gramsevak_name: ''
    });

    const fetchPresidents = async () => {
        try {
            setLoading(true);
            const response = await HttpnInstance.post('/president/getPresidents');
            if (response.data.length === 0) {
                setVarNoData(true);
            } else {
                setVarNoData(false);
            }
            setVarPresidents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching presidents:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await HttpnInstance.post('/president/deletePresident', { id });
            setVarPresidents(varPresidents.filter(president => president.id !== id));
        } catch (error) {
            console.error('Error deleting president:', error);
        }
    };

    const handleChange = (e) => {
        setVarNewPresident({
            ...varNewPresident,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await HttpnInstance.post('/president/addPresident', varNewPresident);
            fetchPresidents();
            setVarNewPresident({
                president_name: '',
                president_phone: '',
                village: '',
                taluka: '',
                district: '',
                gramsevak_name: ''
            });
            setVarAddOverlay(false);
        } catch (error) {
            console.error('Error adding president:', error);
        }
    };

    useEffect(() => {
        fetchPresidents();
    }, []);

    return loading ? (
        <LoadingAnim />
    ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    {varNoData ? "No Data Found" : "Presidents"}
                </h1>
            </div>

            {varAddOverlay ? (
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="president_name" className="block text-sm font-medium text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="president_name"
                                    id="president_name"
                                    placeholder="Name"
                                    value={varNewPresident.president_name}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="president_phone" className="block text-sm font-medium text-gray-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="president_phone"
                                    id="president_phone"
                                    placeholder="Phone"
                                    value={varNewPresident.president_phone}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="village" className="block text-sm font-medium text-gray-900">
                                Village
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="village"
                                    id="village"
                                    placeholder="Village"
                                    value={varNewPresident.village}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="taluka" className="block text-sm font-medium text-gray-900">
                                Taluka
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="taluka"
                                    id="taluka"
                                    placeholder="Taluka"
                                    value={varNewPresident.taluka}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-900">
                                District
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="district"
                                    id="district"
                                    placeholder="District"
                                    value={varNewPresident.district}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="gramsevak_name" className="block text-sm font-medium text-gray-900">
                                Gramsevak Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="gramsevak_name"
                                    id="gramsevak_name"
                                    placeholder="Gramsevak Name"
                                    value={varNewPresident.gramsevak_name}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className='flex justify-around'>
                            <button
                                type="submit"
                                className="flex w-1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add President
                            </button>
                            <button
                                type="button"
                                onClick={() => setVarAddOverlay(false)}
                                className="flex w-1/4 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg flex lg:flex-row lg:gap-y-0 flex-col gap-y-3 items-center justify-around">
                    <button
                        onClick={() => setVarAddOverlay(true)}
                        className="flex lg:w-1/4 w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Add President
                    </button>
                </div>
            )}

            {!varAddOverlay && !varNoData && (
                <div className="mt-10 mx-auto flex flex-col items-center w-full px-4">
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Village</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taluka</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gramsevak</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {varPresidents.map((president) => (
                                    <tr key={president.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{president.president_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{president.president_phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{president.village}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{president.taluka}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{president.district}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{president.gramsevak_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(president.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default President;