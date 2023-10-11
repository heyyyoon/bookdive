import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar({openModal}) {
    
//<Link to='/login'>Login</Link>
    return (
        <header className='border-b border-gray-300 p-4 flex justify-between'>
            <Link to='/'><h1 className='text-3xl'>Book Dive</h1></Link>
            <div className='flex gap-4 items-center text-2xl'>
                <button className=''>MyPage</button>
                <button onClick={openModal}>Login</button>
            </div>
        </header>
    );
}

