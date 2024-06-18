import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/homepage/navigationBar';
import FormAddNovel from "../components/addNovel/formAddNovel";
import axios from 'axios';

const AddNovel = () => {
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
       <div className="container-fluid">
           <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userProfile={userProfile} />
           <FormAddNovel />
       </div>
   );
};

export default AddNovel;
