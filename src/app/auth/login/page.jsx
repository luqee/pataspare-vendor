'use client'
import UserLoginForm from '@/forms/UserLoginForm';
import {Container, Row, Col} from 'react-bootstrap';

function UserLogin(){
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={4}>
                    <UserLoginForm />        
                </Col>
            </Row>
        </Container>
    )
}

export default UserLogin;
