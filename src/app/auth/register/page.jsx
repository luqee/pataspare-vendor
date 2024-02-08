'use client'
import {Container, Row, Col } from 'react-bootstrap';
import VendorRegisterForm from '@/forms/VendorRegisterForm';

function VendorRegister(){
    return (
        <Container>
            {/* <Helmet>
                <title>Vendor Registration | PataSpare vendor</title>
                <meta name="description" content="Join Pataspare as on of our partner stores" />
                </Helmet> */}
            <Row className="justify-content-md-center">
                <Col lg={4}>
                    <VendorRegisterForm />
                </Col>
            </Row>
        </Container>
    )
}

export default VendorRegister;
