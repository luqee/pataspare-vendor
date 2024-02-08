'use client'
import {Container, Row, Col} from 'react-bootstrap';
import { getOrders } from '@/utils/api';
import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';
import OrderItemsTable from '@/components/vendor/OrderItemsTable';

function Orders(){
    const [orderItems, setOrderItems] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchOrders = () =>{
        setLoading(true)
        getOrders()
        .then((response)=>{
            setLoading(false)
            if(response.status === 200){
                setOrderItems(response.data.data.order_items)
            }
        }).catch((err)=>{
            console.log(err)
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