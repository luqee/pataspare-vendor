import {Container, Row, Col} from 'react-bootstrap';
import { getShopOrders } from '../../api/api';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import OrderItemsTable from '../../components/vendor/OrderItemsTable';

function ShopOrders(){
    const [orderItems, setOrderItems] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useContext(UserContext).user
    const params = useParams()

    const fetchOrders = () =>{
        setLoading(true)
        getShopOrders(user.token, params.shopId, (response)=>{
            if(response.status === 200){
                setLoading(false)
                setOrderItems(response.data.order_items)
            }
        })
    }
    useEffect(()=>{
        fetchOrders()
    }, [orderItems])

    return (
        <Container>
            <Row>
                <Col>
                <p>Order Items</p>
                </Col>
            </Row>
            <Row>
            <Col lg={12}>
            <Loader loading={loading} />
            <OrderItemsTable orderItems={orderItems} />
            </Col>
            </Row>
        </Container>
    )
}

export default ShopOrders;