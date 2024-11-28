import React from 'react';
import CommonCarousel from './Carousel';

const formatDate = (isoDateTime) => {
    const date = new Date(isoDateTime);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    }).split("at")[0];
};

const CampCard = ({ camp, onDelete }) => {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow notime:bg-gray-800 notime:border-gray-700">
            <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 notime:text-white">{camp.name}</h5>
            </div>
            <p className="mb-3 font-normal text-gray-700 notime:text-gray-400">Venue: {camp.venue}</p>
            <p className="mb-3 font-normal text-gray-700 notime:text-gray-400">Date Of Organization: {formatDate(camp.dateoforganization)}</p>
            <p className="mb-3 font-normal text-gray-700 notime:text-gray-400">Village: {camp.village}</p>
            {camp.images && <CommonCarousel images={camp.images} />}
            <div onClick={() => onDelete(camp.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 notime:bg-red-600 notime:hover:bg-red-700 notime:focus:ring-red-800">
                Delete
            </div>
        </div>
    );
};

export default CampCard;