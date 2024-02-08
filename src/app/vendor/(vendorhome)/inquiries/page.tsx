'use client'
import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { getInquiries } from '@/utils/api';
import Loader from '@/components/Loader';
import InquiriesTable from '@/components/vendor/InquiriesTable';

function Inquiries(){
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchInquiries = () => {
        getInquiries()
        .then((response)=>{
            setLoading(false)
            if (response.status === 200){
                setInquiries(response.data.data.inquiries)
            }
        })
    }

    useEffect(()=>{
        fetchInquiries()
    }, [])

    return <Container>
        <Row>
            <Col>
            <p>Inquiries in my shops</p>
            </Col>
        </Row>
        <Row style={{
            minHeight: `50px`,
            justifyContent: 'center'
        }}>
            <Col lg={12}>
            <Loader loading={loading} />
            <InquiriesTable inquiries={inquiries} />
            </Col>
        </Row>
    </Container>
};

export default Inquiries;
