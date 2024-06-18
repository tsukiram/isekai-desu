// src/pages/favoritPage.jsx (nama)



import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import NavigationBar from '../components/homepage/navigationBar';
import FavoriteList from '../components/fav/favoriteList';
import SearchBar from '../components/fav/searchBar';
import ConfirmModal from '../components/fav/confirmModal';
import '../styles/favorit.css';
import Footer from '../components/homepage/footer';

const FavoritesPage = () => {
    const [favoriteNovels, setFavoriteNovels] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [novelToUnfavorite, setNovelToUnfavorite] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://tsukirama.pythonanywhere.com/api/users/profile/', {
                headers: { Authorization: `Token ${token}` }
            })
            .then(response => {
                setUserProfile(response.data);
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.error('Fetch user profile error:', error);
            });
        }
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('https://tsukirama.pythonanywhere.com/api/favorite/list/', {
                        headers: { Authorization: `Token ${token}` }
                    });
                    setFavoriteNovels(response.data);
                } catch (error) {
                    console.error('Failed to fetch favorite novels', error);
                }
            }
        };

        fetchFavorites();
    }, []);

    const handleToggleFavorite = async (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.post(
                    'https://tsukirama.pythonanywhere.com/api/favorite/toggle/',
                    { post_id: id },
                    { headers: { Authorization: `Token ${token}` } }
                );
                setFavoriteNovels((prevFavorites) =>
                    prevFavorites.filter((novel) => novel.id !== id)
                );
                setShowModal(false);
            } catch (error) {
                console.error('Failed to toggle favorite', error);
            }
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    const filteredNovels = favoriteNovels.filter((novel) =>
        novel.title.toLowerCase().includes(searchQuery)
    );

    const handleShowModal = (novel) => {
        setNovelToUnfavorite(novel);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNovelToUnfavorite(null);
    };

    const handleConfirmUnfavorite = () => {
        if (novelToUnfavorite) {
            handleToggleFavorite(novelToUnfavorite.id);
        }
    };

    return (
        <>
            <div className='containerContent'>
                <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userProfile={userProfile} />
                <Container fluid className="pt-5 mt-5 contentFav">
                    <h2 className="mb-4">Novel Favorit Kamu</h2>
                    <SearchBar onSearch={handleSearch} />
                    <Row>
                        {filteredNovels.map((novel) => (
                            <Col key={novel.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <FavoriteList
                                    cards={[{
                                        id: novel.id,
                                        title: novel.title,
                                        author: novel.author_name,
                                        category: novel.category_name,
                                        cover_image_name: novel.cover_image_name,
                                        profile_image: novel.profile_image,  // Add profile image URL if available
                                        description: novel.description // Add description if available
                                    }]}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
                <ConfirmModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleConfirm={handleConfirmUnfavorite}
                    novelTitle={novelToUnfavorite ? novelToUnfavorite.title : ''}
                />
                {/* <div id='footer'>
                    <Footer />
                </div> */}
            </div>
        </>
    );
};

export default FavoritesPage;
