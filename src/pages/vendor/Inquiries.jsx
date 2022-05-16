import React, {Component, useContext, useEffect, useState} from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap';
import autoAPI, { getInquiries } from '../../api/api';
import urls from '../../config/config';
import Loader from '../Loader';
import {Link} from 'react-router-dom';
import { UserContext } from '../../App';
import InquiriesTable from '../../components/vendor/InquiriesTable';

function Inquiries(){
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useContext(UserContext).user

    const fetchInquiries = () => {
        getInquiries(user.token, (response) => {
            if (response.status === 200){
                setLoading(false)
                setInquiries(response.data.inquiries)
            }
        })
    }

    useEffect(()=>{
        fetchInquiries()
    }, [inquiries])

    render = () => {
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
}

export default Inquiries;
