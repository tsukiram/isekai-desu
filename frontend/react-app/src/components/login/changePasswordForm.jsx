import { Form, Button, Image, Modal } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom"
import googleLogo from "/assets/Logo/Google Logo.svg"
import resetPassword from "/assets/Icon/reset-password.svg"
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const ChangePasswordForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { uidb64, token } = useParams();

    const handleCloseModal = () => setShowModal(false);

    const resetPasswordUser = async (values) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/users/reset-password/${uidb64}/${token}/`, {
                password: values.password,
                password_confirm: values.confirmPassword
            });
            setModalMessage(response.data.message);
            setShowModal(true);
        } catch (error) {
            setModalMessage(error.response.data.error);
            setShowModal(true);
        }
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        onSubmit: resetPasswordUser,
        validationSchema: yup.object().shape({
            password: yup.string().required("Password diperlukan")
                .matches(/[a-z]/, 'Password harus mengandung huruf kecil')
                .matches(/[A-Z]/, 'Password harus mengandung huruf besar')
                .matches(/[0-9]/, 'Password harus mengandung angka')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password harus mengandung karakter spesial')
                .min(8, 'Panjang password minimal 8 karakter'),
            confirmPassword: yup.string()
                .required("Konfirmasi password diperlukan")
                .oneOf([yup.ref('password'), null], 'Kedua password harus sama')
        }),
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
    }

    return (
        <Form className='loginForm' onSubmit={formik.handleSubmit}>
            <h1>Ubah Password</h1>

            <Form.Group>
                <p>Silahkan ubah password lama mu dengan password yang baru</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Kata Sandi</Form.Label>
                <Form.Control type="password" placeholder="Masukkan kata sandi kamu" onChange={handleForm} onBlur={formik.handleBlur} name='password' isInvalid={formik.touched.password && formik.errors.password} />
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Konfirmasi Kata Sandi</Form.Label>
                <Form.Control type="password" placeholder="Masukkan kata sandi kamu sekali lagi" onChange={handleForm} onBlur={formik.handleBlur} name='confirmPassword' isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword} />
                <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="dark" type="submit">
                Ubah Password
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ubah Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={resetPassword} alt="Reset Password" />
                    <p>{modalMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/login">
                        <Button variant="primary" style={{ backgroundColor: "#71CC9B", border: "1px #71CC9B" }}>
                            Kembali ke Login
                        </Button>
                    </Link>
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
    )
}

export default ChangePasswordForm;
