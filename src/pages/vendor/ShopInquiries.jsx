import { useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getShopInquiries } from '../../api/api';
import Loader from '../../components/Loader';
import InquiriesTable from '../../components/vendor/InquiriesTable';

function ShopInquiries(){
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useContext(UserContext).user
    const params = useParams()
    
    const fetchInquiries = () =>{
        getShopInquiries(user.token, params.shopId, (response) => {
            if (response.status === 200){
                setInquiries(response.data.inquiries)
            }
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
