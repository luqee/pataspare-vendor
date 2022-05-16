import {Link, useLocation, useParams} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import PartsTable from '../../components/vendor/PartsTable';

function ShopInventory(){
    const location = useLocation()
    const user = useContext(UserContext).user
    const [parts, setParts] = useState([])
    const params = useParams()

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
            setParts(location.state.shop.parts)
        }
    })

    let shop = parts[0].shop
    let shopName = ''
    if(shop !== undefined){
        shopName = shop.name[0].toUpperCase() + shop.name.slice(1)
    }
    return (
        <Container>
            <Row>
                <Col>
                <p>{`${shopName}'s Inventory`}</p>
                <Link style={{
                    float:"right"
                }} to={{
                    pathname: `create`,
                    state: {shop: shop}
                }}>
                    <Button>ADD PART</Button>
                </Link>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                <PartsTable parts={parts} />
                </Col>
            </Row>
        </Container>
    )
}

export default ShopInventory;
