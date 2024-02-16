'use client'
import {Container, Row, Col } from 'react-bootstrap';
import VendorRegisterForm from '@/forms/VendorRegisterForm';
import Link from 'next/link';

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
                    <p className={`${formStyles.FormText}`}>By Signing up, you agree to our <Link href={`/terms`}>terms of service</Link> and <Link href={`/privacy`}>privacy policy</Link></p>
                </Col>
            </Row>
        </Container>
    )
}

export default VendorRegister;
