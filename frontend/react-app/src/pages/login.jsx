import { Row, Col } from 'react-bootstrap';
import LoginForm from '../components/login/loginForm';
import CarouselLogin from '../components/login/carousel';
import "../styles/login.css"

function Login() {
    return (
        <div className='containerLogin'>
            <Row className='containerRow'>
                <Col><CarouselLogin /></Col>
                <Col><LoginForm /></Col>
            </Row>
        </div>
    )
}

export default Login