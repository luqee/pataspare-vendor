import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deletePart, getPart } from '../../api/api';
import { UserContext } from '../../App';
import DeletePartModal from '../../components/vendor/DeletePartModal';
import EditPartForm from '../../forms/EditPartForm';

function InventoryItem(){
    const [showDialog, setShowDialog] = useState(false)
    const [part, setPart] = useState({})
    const location = useLocation()
    const params = useParams()
    const user = useContext(UserContext).user

    const fetchPart = ()=>{
        getPart(user.token, params.partId, (response) =>{
            if (response.status === 200) {
                setPart(response.data.part)
            }
        })
    }

    useEffect(()=>{
        if (location.state) {
            setPart(location.state.part)
        }else{
            fetchPart()
        }
    }, [])

    const handleShow = () => {
        setShowDialog(true)
    }
    const handleHide = () => {
        setShowDialog(false)
    }
    
    const navigate = useNavigate()
    const handleConfirmDelete = () => {
        deletePart(user.token, part.id, (response) => {
            if (response.status === 200){
                navigate(`/vendor/shops/${params.shopId}/manage/inventory`, {state: {removed: part.id}})
            }
        })
    }
    
    return(
        <Container>
            <p>{`Edit ${part.title}'s Details`}</p>
            <Button variant="primary" onClick={handleShow}>
                Delete
            </Button>
            <DeletePartModal 
                show={showDialog} 
                onConfirm={handleConfirmDelete} 
                onHide={handleHide}
                part={part}
            />
            <Row>
                <Col lg={7}>
                    <EditPartForm part={part} />
                </Col>
            </Row>
        </Container>
    )
}
export default InventoryItem