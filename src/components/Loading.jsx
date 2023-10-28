import React from 'react';
import { BarLoader } from 'react-spinners';

export default function Loading() {
    return (
        <div className='flex justify-center'>
            <BarLoader />
        </div>
    );
}

