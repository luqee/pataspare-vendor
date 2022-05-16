import {Link, useLocation} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import { getShop } from '../../api/api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

function ShopIndex(){
    const location = useLocation()
    const user = useContext(UserContext).user
    const [shop, setShop] = useState({})

    const fetchShop = () => {
        getShop(user.token, params.shopId, (response)=>{
            if (response.status === 200){
                setParts(response.data.parts)
            }
        })
    }

    useEffect(()=>{
        if (!location.state) {
            fetchShop()
        }else{
            setShop(location.state.shop)
        }
    })
    return (
        <Container>
            <Row>
                <Col>
                <p>View and manage shop's <Link to={{
                        pathname: `inventory`,
                        state: {shop: shop}
                    }}>inventory</Link> ,<Link to={{
                        pathname: `orders`,
                        state: {shop: shop}
                    }}>orders</Link> and <Link to={{
                        pathname: `inquiries`,
                        state: {shop: shop}
                    }}>inquiries</Link>.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ShopIndex;
