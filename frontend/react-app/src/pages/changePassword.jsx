import { Row, Col } from 'react-bootstrap';
import ChangePasswordForm from '../components/login/changePasswordForm';
import CarouselLogin from '../components/login/carousel';
import "../styles/login.css"

function ChangePassword() {
    return (
        <div className='containerLogin'>
            <Row className='containerRow'>
                <Col><CarouselLogin /></Col>
                <Col><ChangePasswordForm /></Col>
            </Row>
        </div>
    )
}

export default ChangePassword