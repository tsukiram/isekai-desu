import { Container, Row, Col } from 'react-bootstrap';

const Intro = () => {
    return (
        <div className='intro display-flex'>
            <Container>
                <Row>
                    <Col>
                        <div className='sapaan'>Selamat datang di Isekai Desu!</div>
                        <div><h1 className='tagLine'>Ayo Eksplor Novel Favoritmu di Isekai Desu!</h1></div>
                        <div className='desc'>
                            <p>Bangun komunitas membaca novel tentunya hanya di Isekai Desu</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Intro
