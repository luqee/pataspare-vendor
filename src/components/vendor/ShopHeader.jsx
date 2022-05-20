import { Container, Nav, Navbar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import logo from '../../images/pataspare-logo.png'
import AuthButton from "../AuthButton";

function ShopHeader(){
    const params = useParams()

    return (
        <Navbar collapseOnSelect expand="lg" style={{
            borderBottom: '5px solid #343a40',
            backgroundColor: '#007bff',
        }}>
            <Container>
                <Navbar.Brand href="/">
                <img
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
                    <Nav.Link href={`/vendor/shops/${params.shopId}/manage/inventory`}>Parts</Nav.Link>
                    <Nav.Link href={`/vendor/shops/${params.shopId}/manage/orders`}>Orders</Nav.Link>
                    <Nav.Link href={`/vendor/shops/${params.shopId}/manage/inquiries`}>Inquiries</Nav.Link>
                    </Nav>
                    <AuthButton />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default ShopHeader;