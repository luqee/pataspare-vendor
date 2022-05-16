import {Container, Row, Col, Table} from 'react-bootstrap';
import OrderItemsTable from './OrderItemsTable';
import autoAPI, { getOrders } from '../../api/api';
import Loader from '../Loader';
import OrderItem from './OrderItem';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

function Orders(){
    const [orderItems, setOrderItems] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useContext(UserContext).user

    const fetchOrders = () =>{
        getOrders(user.token, (response)=>{
            if(response.status === 200){
                setLoading(flase)
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