import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Image, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import CardBookTagline from "../cards/cardBookTagline";
import trashIcon from "/assets/Icon/trash.svg";

const DetailNovelContent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetchPost();
        fetchComments();
        fetchUserProfile();
        checkIfFavorite();
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`https://tsukirama.pythonanywhere.com/api/posts/${id}/`);
            setPost(response.data);
        } catch (error) {
            console.error("There was an error fetching the post!", error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://tsukirama.pythonanywhere.com/api/posts/${id}/comments/`);
            setComments(response.data);
        } catch (error) {
            console.error("There was an error fetching the comments!", error);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get(`https://tsukirama.pythonanywhere.com/api/users/profile/`, {
                headers: { Authorization: `Token ${token}` }
            });
            setCurrentUser(response.data);
        } catch (error) {
            console.error("There was an error fetching the user profile!", error);
        }
    };

    const checkIfFavorite = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get(`https://tsukirama.pythonanywhere.com/api/favorite/list/`, {
                headers: { Authorization: `Token ${token}` }
            });
            const favoritePosts = response.data;
            setIsFavorite(favoritePosts.some(favoritePost => favoritePost.id === parseInt(id)));
        } catch (error) {
            console.error("There was an error checking favorite status!", error);
        }
    };

    const handleToggleFavorite = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to add to favorites');
                return;
            }

            const response = await axios.post('https://tsukirama.pythonanywhere.com/api/favorite/toggle/', 
            { post_id: id }, 
            { headers: { Authorization: `Token ${token}` } });

            if (response.status === 201) {
                setIsFavorite(true);
                alert('Novel added to favorites');
            } else if (response.status === 204) {
                setIsFavorite(false);
                alert('Novel removed from favorites');
            }
        } catch (error) {
            console.error("There was an error toggling favorite status!", error);
        }
    };

    const handleNewCommentChange = (e) => setNewComment(e.target.value);

    const handleNewCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`https://tsukirama.pythonanywhere.com/api/comments/create/`, {
                    post: id,
                    content: newComment,
                }, {
                    headers: { Authorization: `Token ${token}` }
                });
                setComments([...comments, response.data]);
                setNewComment('');
            } catch (error) {
                console.error("There was an error posting the comment!", error);
                console.error("Error details:", error.response.data);
            }
        }
    };

    const handleDeleteClick = (comment) => {
        setShowDeleteConfirm(true);
        setCommentToDelete(comment);
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://tsukirama.pythonanywhere.com/api/comments/${commentToDelete.id}/delete/`, {
                headers: { Authorization: `Token ${token}` }
            });
            setComments(comments.filter(comment => comment.id !== commentToDelete.id));
            setShowDeleteConfirm(false);
            setCommentToDelete(null);
        } catch (error) {
            console.error("There was an error deleting the comment!", error);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setCommentToDelete(null);
    };

    const handleDeletePost = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://tsukirama.pythonanywhere.com/api/posts/${id}/delete/`, {
                headers: { Authorization: `Token ${token}` }
            });
            navigate('/');
        } catch (error) {
            console.error("There was an error deleting the post!", error);
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className='detailNovelContent'>
            <div className='Left-Section'>
                <Image src={`/${post.cover_image_name}`} alt={post.title} className='book-cover' />
                <div className='Left-Section-Description'>
                    <h5>{post.title}</h5>

                    <CardBookTagline category={post.category_name} alt='category' className='category-img' />
                    <br/>
                    <hr />
                    <div className='author'>
                        <Image src={`/${post.profile_image}`} alt="author" className='profile-author' />
                        <p className="mb-0" style={{ fontSize: '1rem' }}> Penulis : {post.author_name} </p>
                        {currentUser && currentUser.user === post.author && (
                            <Button variant="danger" onClick={handleDeletePost} style={{ marginLeft: '10px' }}>
                                <Image src={trashIcon} alt="Trash Logo" style={{ width: '20px' }} />
                            </Button>
                        )}
                    </div>
                    {currentUser && (
                        <Button 
                            className='Fav-Btn' 
                            onClick={handleToggleFavorite}
                            variant={isFavorite ? 'danger' : 'primary'}
                        >
                            {isFavorite ? 'Hapus dari Favorit' : 'Tambahkan ke Favorit'}
                        </Button>
                    )}
                </div>
            </div>
            <div className='Right-Section'>
                <div className='Novel'>
                    <div className='main-title'>
                        <h3>{post.title}</h3>
                    </div>
                    <hr className="divider" />
                    <p>{post.description}</p>
                    <hr className="divider" />
                    <p>{post.content}</p>
                </div>
                <div className='bottom-button'>
                    <Link to="/"><Button className='back-btn'>Kembali ke halaman utama</Button></Link>
                </div>
                <div className='comments'>
                    <div className='komen2'>
                        <h4>Comments</h4>
                        <hr className="divider" />
                        {comments.map(comment => (
                            <div className='komen-orang' key={comment.id}>
                                <div className='profil-orang'>
                                <Image src={`/${comment.profilImg}`} alt="profilePict" style={{ width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover' }} />
                                    <div className='profil-description'>
                                        <h4>
                                            {comment.username}
                                            {currentUser && comment.user === currentUser.user && (
                                                <Image 
                                                    src={trashIcon} 
                                                    alt="Trash Logo" 
                                                    className='trash-logo' 
                                                    onClick={() => handleDeleteClick(comment)} 
                                                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                                                />
                                            )}
                                        </h4>
                                        <p>{new Date(comment.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className='isi-komen'>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h5>Masukkan komentar</h5>
                    <hr className="divider" />
                    {currentUser ? (
                        <div className='input-comments'>
                            <Form onSubmit={handleNewCommentSubmit}>
                                <Form.Group controlId="formNewComment">
                                    <Form.Control as="textarea" rows={3} value={newComment} onChange={handleNewCommentChange} placeholder="Tulis komentarmu..." />
                                </Form.Group>
                                <Button className='comment-btn' type="submit">Komentar</Button>
                            </Form>
                        </div>
                    ) : (
                        <p>Silakan <Link to="/login">login</Link> untuk menambahkan komentar.</p>
                    )}
                </div>
            </div>
            <Modal show={showDeleteConfirm} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DetailNovelContent;
