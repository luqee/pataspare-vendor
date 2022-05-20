import{ useContext, useEffect, useState} from 'react';
import { getParts } from '../../api/api';
import {Container, Row, Col} from 'react-bootstrap';
import { UserContext } from '../../App';
import PartsTable from '../../components/vendor/PartsTable';

function Inventory() {
    const [parts, setParts] = useState([])
    const user = useContext(UserContext).user

    const fetchParts = () => {
        getParts(user.token, (response) => {
            if (response.status === 200){
                setParts(response.data.parts)
            }
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
