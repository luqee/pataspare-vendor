import {Container, Row, Col} from 'react-bootstrap';
import { getOrders } from '../../api/api';
import Loader from '../../components/Loader';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import OrderItemsTable from '../../components/vendor/OrderItemsTable';

function Orders(){
    const [orderItems, setOrderItems] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useContext(UserContext).user

    const fetchOrders = () =>{
        setLoading(true)
        getOrders(user.token, (response)=>{
            if(response.status === 200){
                setLoading(false)
                setOrderItems(response.data.order_items)
            }
        })
    }
    useEffect(()=>{
        fetchOrders()
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                <p>Orders in my shops</p>
                </Col>
            </Row>
            <Row>
            </Row>
            <Row style={{
                minHeight: `50px`,
                justifyContent: 'center'
            }}>
                <Col lg={12}>
                <Loader loading={loading} />
                <OrderItemsTable orderItems={orderItems} />
                </Col>
            </Row>
        </Container>
    )
}

export default Orders;