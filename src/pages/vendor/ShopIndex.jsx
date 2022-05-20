import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

function ShopIndex(){
    return (
        <Container>
            <Row>
                <Col>
                <p>View and manage shop's 
                    <Link to={`inventory`}>inventory</Link> ,
                    <Link to={`orders`}>orders</Link> and 
                    <Link to={`inquiries`}>inquiries</Link>.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ShopIndex;
