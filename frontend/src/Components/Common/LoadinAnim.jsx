import React from 'react'

export default function LoadingAnim() {
    return (
        <div className="absolute top-0 left-0 flex items-center justify-center h-screen w-full">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                </div>
            </div>
        </div>
    )
}