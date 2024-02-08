'use client'
import Link from 'next/link';
import {Container, Row, Col} from 'react-bootstrap';

function Dash(){
    return (
        <Container>
            <Row>
                <Col>
                <p>Welcome to the dealers' dashboard. Here you can create and manage <Link href={`/vendor/shops`}>shops</Link>, view <Link href={`/vendor/inventory`}>inventory</Link>, <Link href={`/vendor/orders`}>orders</Link> and <Link href={`/vendor/inquiries`}>inquiries</Link>.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Dash;