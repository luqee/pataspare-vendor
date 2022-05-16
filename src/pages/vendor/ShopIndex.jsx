import {Link, useLocation} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

function ShopIndex(){
    const location = useLocation()
    let shop = location.state.shop
    return (
        <Container>
            <Row>
                <Col>
                <p>View and manage shop's <Link to={{
                        pathname: `parts`,
                        state: {shop: shop}
                    }}>inventory</Link> ,<Link to={{
                        pathname: `${props.match.url}/orders`,
                        state: {shop: shop}
                    }}>orders</Link> and <Link to={{
                        pathname: `${props.match.url}/inquiries`,
                        state: {shop: shop}
                    }}>inquiries</Link>.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ShopIndex;
