import { useContext, useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useOutletContext, useParams } from 'react-router-dom';
import { getShopInquiries } from '../../api/api';
import { UserContext } from '../../App';
import Loader from '../../components/Loader';
import InquiriesTable from '../../components/vendor/InquiriesTable';

function ShopInquiries(){
    const shop = useOutletContext().shop
    const [inquiries, setInquiries] = useState(shop.inquiries)
    const user = useContext(UserContext).user
    const params = useParams()
    const [loading, setLoading] = useState(false)
    
    const fetchInquiries = () =>{
        setLoading(true)
        getShopInquiries(user.token, params.shopId, (response) => {
            setLoading(false)
            if (response.status === 200){
                setInquiries(response.data.inquiries)
            }
        })
    }

    useEffect(()=>{
        if (Object.keys(shop).length > 0) {
            setInquiries(shop.inquiries)
        }else{
            fetchInquiries()
        }
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
