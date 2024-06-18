// src/index.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/login';
import HomePage from './pages/home';
import SignIn from './pages/signIn';
import ChangePassword from './pages/changePassword';
import ForgotPassword from './pages/forgotPassword';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DetailNovel from './pages/detailNovel';
import AddNovel from './pages/addNovel';
import ProfilePage from './pages/profile';
import FavoritesPage from './pages/favoritPage';
import axios from 'axios';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/users/login-status/', {
                        headers: { Authorization: `Token ${token}` }
                    });
                    if (response.status === 200) {
                        setIsLoggedIn(true);
                    }
                } catch (error) {
                    console.error('Failed to authenticate token', error);
                    setIsLoggedIn(false);
                }
            }
        };
        checkLoginStatus();
    }, []);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage isLoggedIn={isLoggedIn} />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signIn',
            element: <SignIn />
        },
        {
            path: '/changePassword/:uidb64/:token',
            element: <ChangePassword />
        },
        {
            path: '/forgotPassword',
            element: <ForgotPassword />
        },
        {
            path: '/detailNovel/:id',
            element: <DetailNovel isLoggedIn={isLoggedIn} />
        },
        {
            path: '/addNovel',
            element: isLoggedIn ? <AddNovel /> : <Login />
        },
        {
            path: '/profile',
            element: isLoggedIn ? <ProfilePage /> : <Login />
        },
        {
            path: '/favorit',
            element: isLoggedIn ? <FavoritesPage /> : <Login />
        }
    ]);

    return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
