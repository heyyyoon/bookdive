import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { logout } from '../api/firebase';
import Account from '../pages/Account';
import { FiSearch } from 'react-icons/fi';

export default function Navbar() {
    const [ text, setText ] = useState('');
    const { user } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate(`/search/${text}`);
    }
    const handleLogout = () => {
        logout();
        navigate(`/home`);
    }
    return (
        <header className='px-5 py-3 flex justify-between items-center bg-[#fdf9f9] shadow-3xl'>
            <Account onClose={()=>setIsModalOpen(false)} isOpen={isModalOpen} />
            <div className='w-3/12'>
                <Link to='/'><h1 className='text-xl font-bold text-zinc-800'>Book Dive</h1></Link>
            </div>
            <form className='w-4/12 flex justify-center' onSubmit={handleSubmit}>
                <input className="w-full rounded-l-md px-3 py-2 bg-yellow" type="text" placeholder='Search...' onChange={(e) => setText(e.target.value)} value={text}/>
                <button className="rounded-r-md px-3 my-1 bg-[#DDDDDD] border-none"><FiSearch /></button>
            </form>
            <div className='flex items-center gap-3 text-xl w-3/12 justify-end'>
                {user && <p className='text-lg font-semibold text-zinc-800'>{user.nickname}</p>}
                {user && 
                    <Link to='/mypage'>
                        <button  className='text-zinc-800 text-lg font-semibold hover:brightness-110'>
                            myPage
                        </button>
                    </Link>
                }
                {
                    user ? 
                    <button className="text-zinc-800 text-lg font-semibold p-2 rounded-full hover:brightness-110" onClick={handleLogout}>Logout</button>
                    : <button className='text-zinc-800 text-lg font-semibold p-2 rounded-full hover:brightness-110' onClick={()=>setIsModalOpen(true)}>Login</button>
                }
            </div>
        </header>
    );
}

