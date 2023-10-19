import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const KAKAO_KEY = 'e4c4de9194b2e3ae34c4e8f0697152f4';
const kakao = axios.create({
    baseURL : "https://dapi.kakao.com",
    headers: {
        Authorization: "KakaoAK "+KAKAO_KEY
    }
});
const kakaoSearch=(params) => {
    return kakao.get("/v3/search/book", {params})
}

export default function Navbar({openModal}) {
    const [ text, setText ] = useState('');
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
            // Parameter 설정
            const params = {
              query: text,
              sort: 'accuracy', // accuracy | recency 정확도 or 최신
              page: 1, // 페이지번호
              size: 10, // 한 페이지에 보여 질 문서의 개수
            };
        
            const { data } = await kakaoSearch(params); // api 호출
            navigate('search', {state : data.documents})
        
    }
    return (
        <header className='border-b border-gray-300 p-4 flex justify-between'>
            <Link to='/'><h1 className='text-3xl'>Book Dive</h1></Link>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Search...' onChange={(e) => setText(e.target.value)} value={text}/>
                <button>search!!</button>
            </form>
            <div className='flex gap-4 items-center text-2xl'>
                <button className=''>MyPage</button>
                <button onClick={openModal}>Login</button>
            </div>
        </header>
    );
}

