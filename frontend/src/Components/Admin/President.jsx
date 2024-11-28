import React, { useState, useEffect } from 'react';
import HttpnInstance from '../Api/nodeapi';

function President() {
    const [varPresidents, setVarPresidents] = useState([]);
    const [varAddOverlay, setVarAddOverlay] = useState(false);
    const [varNewPresident, setVarNewPresident] = useState({
        president_name: '',
        president_phone: '',
        village: '',
        taluka: '',
        district: '',
    });

    const fetchPresidents = async () => {
        try {
            const response = await HttpnInstance.post('/president/getPresidents');
            setVarPresidents(response.data);
        } catch (error) {
            console.error('Error fetching presidents:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await HttpnInstance.post('/president/deletePresident', { id });
            fetchPresidents();
        } catch (error) {
            console.error('Error deleting president:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await HttpnInstance.post('/president/addPresident', varNewPresident);
            fetchPresidents();
            setVarAddOverlay(false);
            setVarNewPresident({
                president_name: '',
                president_phone: '',
                village: '',
                taluka: '',
                district: '',
            });
        } catch (error) {
            console.error('Error adding president:', error);
        }
    };

    useEffect(() => {
        fetchPresidents();
    }, []);

    return (
        <>
            {!varAddOverlay ? (
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Village
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Taluka
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                District
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <button
                                                    onClick={() => setVarAddOverlay(true)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Add President
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {varPresidents.map((president) => (
                                            <tr key={president.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{president.president_name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{president.president_phone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{president.village}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{president.taluka}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{president.district}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap w-full flex justify-center">
                                                    <button
                                                        onClick={() => handleDelete(president.id)}
                                                        className="text-red-400 hover:text-red-600 hover:underline font-semibold py-2 px-4 rounded"
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
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen w-full">
                    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow notimes:bg-gray-800 notimes:border-gray-700">
                        {/* <h1 className="text-2xl font-bold text-center text-gray-900 notimes:text-white">Add President</h1> */}
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="president_name" className="block text-gray-700 notimes:text-gray-400">Name</label>
                                <input
                                    type="text"
                                    name="president_name"
                                    id="president_name"
                                    placeholder="Name"
                                    value={varNewPresident.president_name}
                                    onChange={(e) => setVarNewPresident({ ...varNewPresident, president_name: e.target.value })}
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="president_phone" className="block text-gray-700 notimes:text-gray-400">Phone</label>
                                <input
                                    type="text"
                                    name="president_phone"
                                    id="president_phone"
                                    placeholder="Phone"
                                    value={varNewPresident.president_phone}
                                    onChange={(e) => setVarNewPresident({ ...varNewPresident, president_phone: e.target.value })}
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="village" className="block text-gray-700 notimes:text-gray-400">Village</label>
                                <input
                                    type="text"
                                    name="village"
                                    id="village"
                                    placeholder="Village"
                                    value={varNewPresident.village}
                                    onChange={(e) => setVarNewPresident({ ...varNewPresident, village: e.target.value })}
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="taluka" className="block text-gray-700 notimes:text-gray-400">Taluka</label>
                                <input
                                    type="text"
                                    name="taluka"
                                    id="taluka"
                                    placeholder="Taluka"
                                    value={varNewPresident.taluka}
                                    onChange={(e) => setVarNewPresident({ ...varNewPresident, taluka: e.target.value })}
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="district" className="block text-gray-700 notimes:text-gray-400">District</label>
                                <input
                                    type="text"
                                    name="district"
                                    id="district"
                                    placeholder="District"
                                    value={varNewPresident.district}
                                    onChange={(e) => setVarNewPresident({ ...varNewPresident, district: e.target.value })}
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className='w-full flex justify-around items-center'>
                                    <button type="submit" className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded w-1/3">Add</button>
                                    <button onClick={() => setVarAddOverlay(false)} className="py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm w-1/3 font-semibold rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default President;