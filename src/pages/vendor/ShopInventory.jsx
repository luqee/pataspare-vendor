import {Link, useLocation, useOutletContext, useParams} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import PartsTable from '../../components/vendor/PartsTable';
import { getShop, getShopParts } from '../../api/api';

function ShopInventory(){
    const [shop, setShop] = useState(useOutletContext().shop)
    const [parts, setParts] = useState([])
    const user = useContext(UserContext).user
    const params = useParams()
    const location = useLocation()

    const fetchShop = () => {
        getShop(user.token, params.shopId, (response) => {
            setShop(response.data.shop)
            setParts(response.data.shop.parts)
        })
    }
    const setup = () => {
        if (Object.keys(shop).length > 0) {
            if (location.state) {
                shop.parts.push(location.state.part)
            }
            if(location.state && location.state.removed){
                let removedPart = shop.parts.find((part) => part.id == location.state.removed)
                if(removedPart){
                    shop.parts.splice(shop.parts.indexOf(removedPart), 1)
                }
            }
            setParts(shop.parts.filter(Boolean))
        }else{
            fetchShop()
        }
    }

    let shopName = ''
    if(Object.keys(shop).length > 0){
        shopName = shop.name[0].toUpperCase() + shop.name.slice(1)
    }

    useEffect(()=>{
        setup()
    },[])
    return (
        <Container>
            <Row>
                <Col>
                <p>{`${shopName}'s Inventory`}</p>
                <Link style={{
                    float:"right"
                }} to={`create`}>
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
