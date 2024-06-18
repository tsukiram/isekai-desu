import React, { useState } from 'react';
import { Form, Button, Image, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom"
import googleLogo from "/assets/Logo/Google Logo.svg"
import mailIn from "/assets/Illustration/mailIn.svg"
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const ForgotPasswordForm = () => {
   const [showModal, setShowModal] = useState(false);
   const [modalMessage, setModalMessage] = useState('');

   const handleCloseModal = () => setShowModal(false);

   const forgotPasswordUser = async (values) => {
       try {
           const response = await axios.post('https://tsukirama.pythonanywhere.com/api/users/forgot-password/', {
               email: values.email,
               username: values.username
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
           email: "",
           username: ""
       },
       onSubmit: forgotPasswordUser,
       validationSchema: yup.object().shape({
           email: yup.string().required("Email tidak boleh kosong").email("Harus berupa email yang valid"),
           username: yup.string().required("Username tidak boleh kosong")
       }),
   });

   const handleForm = (event) => {
       const { target } = event;
       formik.setFieldValue(target.name, target.value);
   }

   return (
       <div>
           <Form className='loginForm' onSubmit={formik.handleSubmit}>
               <h1>Lupa Kata Sandi</h1>

               <Form.Group>
                   <p>Masukkan email yang sudah terverifikasi untuk mendapatkan <span className='otpCode'>Kode OTP</span> untuk mengubah kata sandimu.</p>
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicUsername">
                   <Form.Label>Username</Form.Label>
                   <Form.Control type="text" className='font-italic' placeholder="Masukkan username kamu" onChange={handleForm} onBlur={formik.handleBlur} name='username' isInvalid={formik.touched.username && formik.errors.username} />
                   <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Email</Form.Label>
                   <Form.Control type="email" className='font-italic' placeholder="Masukkan email kamu" onChange={handleForm} onBlur={formik.handleBlur} name='email' isInvalid={formik.touched.email && formik.errors.email} />
                   <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
               </Form.Group>

               <Button variant="dark" type="submit">
                   Kirim
               </Button>
           </Form>

           <Modal show={showModal} onHide={handleCloseModal}>
               <Modal.Body>
                   <Image src={mailIn} alt="OTP Image" />
                   <p> Password reset link has been sent to your email.</p>
               </Modal.Body>
               <Modal.Footer>
                   <Link to="/login">
                       <Button variant="primary" style={{ backgroundColor: "#71CC9B", border: "1px #71CC9B" }}>
                           kembali ke halaman login
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
       </div>
   )
}

export default ForgotPasswordForm;
