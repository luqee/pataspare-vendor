'use client'
import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { getInquiries } from '@/utils/api'
import Loader from '@/components/Loader';
import InquiriesTable from '@/components/vendor/InquiriesTable';

function ShopInquiries({params}){
    const [inquiries, setInquiries] = useState(shop.inquiries)
    const [loading, setLoading] = useState(false)
    
    const fetchInquiries = () =>{
        setLoading(true)
        getInquiries(`shop=${params.shopId}`)
        .then((response) => {
            if (response.status === 200){
                setInquiries(response.data.data.inquiries)
            }
        })
        .catch((error) => {
            console.log('Error getting inquiries');
            console.log(error);
        })
    }

    useEffect(()=>{
        fetchInquiries()
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                <p>Inquiries</p>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                <Loader loading={loading} />
                <InquiriesTable inquiries={inquiries} />
                </Col>
            </Row>
        </Container>
    )
}

export default ShopInquiries;
