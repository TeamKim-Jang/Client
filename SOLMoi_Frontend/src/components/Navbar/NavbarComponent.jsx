import { useUser } from "../../contexts/userContext";
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavbarComponent() {
    const expand = 'lg';
    const { onLogin, setEmail, email, setOnLogin, Logout } = useUser();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
            setOnLogin(true); // 로그인 상태로 설정
        } else {
            setOnLogin(false); // 로그아웃 상태로 설정
        }
    }, [setEmail, setOnLogin]);

    return (
        <Navbar expand={expand} className="bg-body-tertiary" style={{  borderBottom: "1px solid #e9e9e9",  }}>
            <Container fluid className="custom-navbar">
                <Navbar.Brand href="/">쏠모이</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {!onLogin ? (
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/auth/login">로그인</Nav.Link>
                                <Nav.Link href="/auth/register">회원가입</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link onClick={Logout}>로그아웃</Nav.Link>
                            </Nav>
                        )}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
