import React from 'react';
import CommonCarousel from './Carousel';

const HospitalCard = ({ hospital, onDelete }) => {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow notime:bg-gray-800 notime:border-gray-700">
            <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 notime:text-white">{hospital.name}</h5>
            </div>
            <p className="mb-3 font-normal text-gray-700 notime:text-gray-400">Location: {hospital.location}</p>
            <p className="mb-3 font-normal text-gray-700 notime:text-gray-400">Village: {hospital.village}</p>
            {hospital.images && <CommonCarousel images={hospital.images} />}
            <div onClick={() => onDelete(hospital.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 notime:bg-red-600 notime:hover:bg-red-700 notime:focus:ring-red-800">
                Delete
            </div>
        </div>
    );
};

export default HospitalCard;