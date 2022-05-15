import {Container, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';

function Dash(){
    return (
        <Container>
            <Helmet>
            <title>PataSpare - Vendor dashboard</title>
            <meta name="description" content="Manage Your shops conviniently." />
            </Helmet>
            <Row>
                <Col>
                <p>Welcome to the dealers' dashboard. Here you can create and manage <Link to={`shops`}>shops</Link>, view <Link to={`inventory`}>inventory</Link>, <Link to={`orders`}>orders</Link> and <Link to={`inquiries`}>inquiries</Link>.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Dash;