'use client'
import CreateShopForm from '@/forms/CreateShopForm';
import {Container,Row, Col} from 'react-bootstrap';

function CreateShop() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={7}>
                <CreateShopForm />
                </Col>
            </Row>
        </Container>
    )
}

export default CreateShop;
