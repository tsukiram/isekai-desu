// src/pages/signin.jsx (jangan hapus komen ini)

import { Row, Col } from 'react-bootstrap';
import SignInForm from '../components/login/signInForm';
import CarouselLogin from '../components/login/carousel';
import "../styles/login.css"

const SignIn = () => {
    return (
        <div className='containerLogin'>
            <Row className='containerRow'>
                <Col><CarouselLogin /></Col>
                <Col><SignInForm /></Col>
            </Row>
        </div>
    )
}

export default SignIn