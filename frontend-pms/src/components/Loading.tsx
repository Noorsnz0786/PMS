'use client';

import React from 'react';

export default function Loading({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
            {/* Message */}
            <p className="text-gray-700 text-lg font-medium">{message}</p>
        </div>
    );
}