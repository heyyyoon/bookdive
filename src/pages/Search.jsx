import React from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';

export default function Search() {
    const { state : books } = useLocation();
    return (
        <>
        <h1 className='text-2xl text-center m-5'>검색 결과</h1>
        <ul className='grid grid-cols-1 md:grid-cols-4 lg-grid-cols-5 gap-6 p-4'>
           {
            books.map(book => 
                <BookCard key={book.isbn} bookInfo={book} />
            )
           }             
        </ul>
        </>
    );
}

