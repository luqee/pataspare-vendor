'use client'
import {Container, Row, Col} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import OrderItemsTable from '@/components/vendor/OrderItemsTable';
import {getOrders} from '@/utils/api'

function ShopOrders({params}){
    const [orderItems, setOrderItems] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchOrders = () =>{
        setLoading(true)
        getOrders(`shop=${params.shopId}`)
        .then((response) => {
            setLoading(false)
            if (response.status === 200){
                setOrderItems(response.data.data.order_items)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(()=>{
        fetchOrders()
    }, [])

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