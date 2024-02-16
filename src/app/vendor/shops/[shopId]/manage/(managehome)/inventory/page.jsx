'use client'
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PartsTable from '@/components/vendor/PartsTable';
import {getParts} from '@/utils/api'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function ShopInventory({params}){
    const [shop, setShop] = useState({})
    const [parts, setParts] = useState([])
    const path = usePathname()

    const fetchParts = ()=>{
        getParts (`shop=${params.shopId}`)
        .then((response) => {
            if (response.status === 200){
                setParts(response.data.data.parts)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(()=>{
        fetchParts()
    }, [])

    let shopName = ''
    if(Object.keys(shop).length > 0){
        shopName = shop.name[0].toUpperCase() + shop.name.slice(1)
    }
    return (
        <Container>
            <Row>
                <Col>
                {/* <p>{`${shopName}'s Inventory`}</p> */}
                <Link style={{
                    float:"right"
                }} href={`${path}/create`}>
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
