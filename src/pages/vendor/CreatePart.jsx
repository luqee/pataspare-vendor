import CreatePartForm from '../../forms/CreatePartForm';
import {Container,Row, Col} from 'react-bootstrap';

function CreatePart() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                <div className="create-part">
                <CreatePartForm />
                </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePart;
