import React from 'react';
import { BarLoader } from 'react-spinners';
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
    return (
        <div className='flex justify-center'>
            <BarLoader />
        </div>
    );
}

