'use client'
import{ useEffect, useState} from 'react';
import { getParts } from '@/utils/api';
import {Container, Row, Col} from 'react-bootstrap';
import PartsTable from '@/components/vendor/PartsTable';

function Inventory() {
    const [parts, setParts] = useState([])

    const fetchParts = () => {
        getParts()
        .then((response)=>{
            if (response.status === 200){
                setParts(response.data.data.parts)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        fetchParts()
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                <p>My Inventory</p>
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

export default Inventory;
