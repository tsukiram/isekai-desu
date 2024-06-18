import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/homepage/navbarDetailNovel';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailNovelContent from '../components/detailNovel/detailNovel';
import "../styles/detailNovel.css";
import Footer from '../components/homepage/footer';
import axios from 'axios';

const DetailNovel = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://tsukirama.pythonanywhere.com/api/users/profile/', {
                headers: { Authorization: `Token ${token}` }
            }).then(response => {
                setUserProfile(response.data);
                setIsLoggedIn(true);
            }).catch(error => {
                console.error('Fetch user profile error:', error);
            });
        }
    }, []);

    return (
        <div>
            <div id='navbar'>
                <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userProfile={userProfile} />
            </div>

            <div id='detailNovel' className='detailNovelClass'>
                <DetailNovelContent />
            </div>

            <div id='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default DetailNovel;