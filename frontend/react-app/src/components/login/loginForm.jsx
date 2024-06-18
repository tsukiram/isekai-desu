import React, { useState } from 'react';
import { Form, Button, Image, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '/assets/Logo/Logo.svg';
import googleLogo from '/assets/Logo/Google Logo.svg';
import bacaBuku from '/assets/Illustration/bacaBuku.svg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleCloseModal = () => setShowModal(false);

    const handleContinue = () => {
        setShowModal(false);
        navigate('/');
        window.location.reload();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:8000/api/users/login/', {
                    username: values.username,
                    password: values.password
                });
                localStorage.setItem('token', response.data.token);
                setShowModal(true);
                console.log('Login successful, token:', response.data.token);
            } catch (error) {
                setLoginError('Invalid credentials');
                console.error('Login error:', error);
            }
        },
        validationSchema: yup.object().shape({
            username: yup.string().required('Username diperlukan'),
            password: yup.string().required('Password diperlukan')
                .matches(/[a-z]/, 'Password harus mengandung huruf kecil')
                .matches(/[A-Z]/, 'Password harus mengandung huruf besar')
                .matches(/[0-9]/, 'Password harus mengandung angka')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password harus mengandung karakter spesial')
                .min(8, 'Panjang password minimal 8 karakter')
        })
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    };

    return (
        <Form className='loginForm' onSubmit={formik.handleSubmit}>
            <Image src={logoImage} alt="Logo Isekai Desu" className="logoKorpus" />
            <h1>Login Isekai Desu</h1>
            {loginError && <p className="text-danger">{loginError}</p>}
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" className='font-italic' placeholder="Masukkan username kamu" onChange={handleForm} onBlur={formik.handleBlur} name='username' isInvalid={formik.touched.username && formik.errors.username} />
                <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Kata Sandi</Form.Label>
                <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Masukkan kata sandi kamu" onChange={handleForm} onBlur={formik.handleBlur} name='password' isInvalid={formik.touched.password && formik.errors.password} />
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                <span onClick={togglePasswordVisibility} className="password-toggle-text">
                    {showPassword ? 'Hide' : 'Show'} Password
                </span>
            </Form.Group>

            <Form.Group className='forgetPass'>
                <Link to="/forgotPassword">
                    <p className='linkTo'>Lupa kata sandi?</p>
                </Link>
            </Form.Group>

            <Button variant="dark" type="submit">Masuk</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Kamu berhasil Login!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={bacaBuku} alt="OTP Image" />
                    <p>Selamat mengeksplor novel di Isekai Desu 😆</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" style={{ backgroundColor: "#71CC9B", border: "1px #71CC9B" }} onClick={handleContinue}>
                        Lanjutkan
                    </Button>
                </Modal.Footer>
            </Modal>

            <Form.Group className='otherMethod'>
                <Form.Label>---------------------- atau ----------------------</Form.Label>
            </Form.Group>

            {/* <Form.Group className='loginViaGoogle'>
                <Link>
                    <Image src={googleLogo} alt="Google Logo" className="text-black googleLogo" />
                    <p className='linkTo'>Masuk dengan Google</p>
                </Link>
            </Form.Group> */}

            <Form.Group className='punyaAkun'>
                <p>Belum punya akun? <span><Link to="/signIn" className='linkTo'>Daftar di sini</Link></span></p>
            </Form.Group>
        </Form>
    );
};

export default LoginForm;
