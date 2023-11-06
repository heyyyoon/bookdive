import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import BookDetail from './pages/BookDetail';
import WriteReview from './pages/WriteReview';
import Mypage from './pages/Mypage';
import Post from './pages/Post';
import LikeReview from './pages/LikeReview';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/search', element: <Search /> },
        { path: '/search/:keyword', element: <Search /> },
        { path: '/detail/:bookId', element: <BookDetail /> },
        { 
          path: '/post',
          element: (
            <ProtectedRoute requireAdmin>
              <WriteReview />
            </ProtectedRoute>
          )
        },
        { path: '/Mypage', element: <Mypage /> },
        { path: '/reviews', element: <LikeReview /> },
      ]
    }
  ]
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

