import React from 'react';

const CommonTable = ({ columns, data }) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((column) => (
                            <th key={column} scope="col" className="px-6 py-3">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {columns.map((column) => (
                                <td key={column} className="px-6 py-4">
                                    {row[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommonTable;