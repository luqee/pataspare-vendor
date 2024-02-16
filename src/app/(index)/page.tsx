'use client'
import UserLoginForm from '@/forms/UserLoginForm';
import { Col, Container, Row } from 'react-bootstrap';

export default function Home() {
  
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
