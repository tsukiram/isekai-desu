import { Navbar, Container, Nav, Image } from "react-bootstrap"
import logoImage from "/assets/Logo/Logo.svg"

const Footer = () => {
    return (
        <div className="footer">
            <Navbar>
                <Container>
                    <Nav className="align-items-center justify-content-center justify-content-md-between">
                        <Navbar.Brand href="/">
                            <Image src={logoImage} alt="Logo Isekai Desu" className="logoKorpus2" />
                        </Navbar.Brand>
                    </Nav>
                    <Nav> <p className="text-center text-md-end">Copyright © 2024 Isekai Desu | All Rights Reserved </p></Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer