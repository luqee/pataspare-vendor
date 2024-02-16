import { useAuthContext } from "@/context/AuthContext";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, NavDropdown } from "react-bootstrap";

function AuthButton() {
    const {user, logout} = useAuthContext()
    return user ? (
        <Nav>
            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
            <NavDropdown.Item href={`/vendor`}>My Account</NavDropdown.Item>
                <NavDropdown.Item href="/#" style={{
                    display: `block`,
                    color: '#000000',
                }}>
                    {/* <Nav.Link eventKey='logout'>Log Out</Nav.Link> */}
                    <a href="/#" onClick={(e) => {
                        e.preventDefault();
                        logout()
                    }} style={{
                        color: '#212529',
                        display: `block`,
                        textDecoration: 'none'
                    }}>Log out</a>
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>

    ) : (
        <Nav className="flex-column flex-lg-row">
            <Nav.Link href="/auth/register">Register</Nav.Link>
            <Nav.Link href="/auth/login">Login</Nav.Link>
        </Nav>
    )
}

export default AuthButton