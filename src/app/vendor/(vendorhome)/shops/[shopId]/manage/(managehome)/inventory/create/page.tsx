'use client'
import CreatePartForm from '@/forms/CreatePartForm';
import {Container,Row, Col} from 'react-bootstrap';

function CreatePart({params}: {params: {shopId:number}}) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                <div className="create-part">
                <CreatePartForm shopId={params.shopId} />
                </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePart;
