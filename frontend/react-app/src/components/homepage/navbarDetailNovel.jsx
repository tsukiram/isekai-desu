import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Image, Button, Popover, Toast } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '/assets/Logo/Logo.svg';
import penIcon from '/assets/Icon/pen.svg';
import profil from '/assets/Illustration/Profil.svg';
import maintain from '/assets/Illustration/maintain.svg';
import axios from 'axios';

const NavigationBar = ({ isLoggedIn, setIsLoggedIn, userProfile }) => {
    const navigate = useNavigate();
    const [showPopover, setShowPopover] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('https://tsukirama.pythonanywhere.com/api/users/logout/', null, {
                    headers: { Authorization: `Token ${token}` }
                });
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const togglePopover = () => setShowPopover(!showPopover);
    const toggleShowToast = () => setShowToast(!showToast);

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary navigationBar">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>Beranda</Nav.Link>
                            {isLoggedIn && (
                                <Nav.Link as={Link} to="/favorit" className={location.pathname === '/favorit' ? 'active' : ''}>Favorit</Nav.Link>
                            )}
                        </Nav>
                        <Navbar.Brand href="/" className="d-flex align-items-center justify-content-center flex-grow-1">
                            <Image src={logoImage} alt="Logo Koper Pustaka" className="logoKorpusLandingPage" />
                        </Navbar.Brand>
                        {isLoggedIn ? (
                            <>
                                <Link to="/addNovel">
                                    <Button variant="outline-success" className="searchBtn">
                                        <Image className="searchBtnImg" src={penIcon} />
                                        Tulis Novel
                                    </Button>
                                </Link>
                                <div className="profil-container" onClick={togglePopover}>
                                    <Image 
                                        src={userProfile && userProfile.image ? `../../${userProfile.image}` : profil} 
                                        alt="Profil" 
                                        className="profil" 
                                        style={{ width: "3rem", height: "3rem", borderRadius: "50%" }} 
                                    />
                                    {showPopover && (
                                        <Popover className="popover-basic">
                                            <Popover.Body>
                                                <Link className="lihat-profil" to='/profile'>Lihat Profil</Link>
                                                <br />
                                                <Link to="/login" onClick={handleLogout} className="logout">Log Out</Link>
                                            </Popover.Body>
                                        </Popover>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link onClick={toggleShowToast}>
                                    <Button variant="outline-success" className="searchBtn">
                                        <Image className="searchBtnImg" src={penIcon} />
                                        Tulis Novel
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline-success" className="loginBtn">Login</Button>
                                </Link>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Toast show={showToast} onClose={toggleShowToast} className="custom-toast">
                <Toast.Header>
                    <strong className="me-auto">Pengumuman!</strong>
                    <img src={maintain} className="rounded me-2" alt="" />
                </Toast.Header>
                <Toast.Body>
                    {isLoggedIn ? "Maaf halaman ini sedang dalam tahap development 👷‍♂️" : "Kamu harus login dulu nih untuk akses fitur ini"}
                    <br />
                    <br />
                    <div className="toast-buttons">
                        <Button variant="outline-secondary" size="lg" onClick={toggleShowToast}>Tutup</Button>
                        {!isLoggedIn && <Link to='/login'><Button variant="outline-success" size="lg" className="btnAjg">Login</Button></Link>}
                    </div>
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default NavigationBar;