'use client'
import {Container, Row, Col} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {getShop} from '@/utils/api'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function ShopIndex({params}){
    const [shop, setShop] = useState({})
    const path = usePathname()

    const fetchShop = ()=>{
        getShop (params.shopId)
        .then((response) => {
            if (response.status === 200){
                setShop(response.data.data.shop)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(()=>{
        fetchShop()
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                <p>View and manage shop's &nbsp;
                    <Link href={`${path}/inventory`}>inventory</Link> ,
                    <Link href={`${path}/orders`}>orders</Link> and 
                    <Link href={`${path}/inquiries`}>inquiries</Link>.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ShopIndex;
