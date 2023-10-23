import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { logout } from '../api/firebase';
import Account from '../pages/Account';

export default function Navbar() {
    const [ text, setText ] = useState('');
    const { user } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate(`/search/${text}`);
    }
    return (
        <header className='border-b border-gray-300 p-4 flex justify-between items-center'>
            <Account onClose={()=>setIsModalOpen(false)} isOpen={isModalOpen} />
            <Link to='/'><h1 className='text-3xl'>Book Dive</h1></Link>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Search...' onChange={(e) => setText(e.target.value)} value={text}/>
                <button>search!!</button>
            </form>
            <div className='flex items-center gap-4 text-2xl'>
                {user && <p className='text-lg bg-zinc-400 px-2 py-1 rounded text-white '>{user.nickname}님</p>}
                {user && <Link to='/mypage'><button className=''>MyPage</button></Link>}
                {
                    user ? <button onClick={logout}>Logout</button>
                    : <button onClick={()=>setIsModalOpen(true)}>Login</button>
                }
            </div>
        </header>
    );
}

