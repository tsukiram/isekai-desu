import { Row, Col } from 'react-bootstrap';
import ForgotPasswordForm from '../components/login/forgotPasswordForm';
import CarouselLogin from '../components/login/carousel';
import "../styles/login.css"

function ForgotPassword() {
    return (
        <div className='containerLogin'>
            <Row className='containerRow'>
                <Col><CarouselLogin /></Col>
                <Col><ForgotPasswordForm /></Col>
            </Row>
        </div>
    )
}

export default ForgotPassword