'use client'
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from '@/images/pataspare-logo.png'
import AuthButton from "../AuthButton";
import { usePathname } from "next/navigation";
import Image from "next/image";

function ShopHeader(){
    const path = usePathname()
    return (
        <Navbar collapseOnSelect expand="lg" style={{
            borderBottom: '5px solid #343a40',
            backgroundColor: '#007bff',
        }}>
            <Container>
                <Navbar.Brand href="/">
                <Image
                    src={logo}
                    width="100"
                    height="40"
                    className="d-inline-block align-top"
                    alt="Pataspare logo"
                />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto flex-column flex-lg-row">
                    <Nav.Link href='/vendor'>Dashboard</Nav.Link>
                    <Nav.Link href={`${path}/inventory`}>Parts</Nav.Link>
                    <Nav.Link href={`${path}/orders`}>Orders</Nav.Link>
                    <Nav.Link href={`${path}/inquiries`}>Inquiries</Nav.Link>
                    </Nav>
                    <AuthButton />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default ShopHeader;