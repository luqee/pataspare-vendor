'use client'
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DeletePartModal from '@/components/vendor/DeletePartModal';
import EditPartForm from '@/forms/EditPartForm';
import { useRouter } from 'next/navigation'
import {getPart, deletePart} from '@/utils/api'

function InventoryItem({params}){
    const [showDialog, setShowDialog] = useState(false)
    const [part, setPart] = useState({})
    const router = useRouter()

    const fetchPart = ()=>{
        getPart(params.partId)
        .then((response) => {
            if (response.status === 200){
                setPart(response.data.data.part)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(()=>{
        fetchPart()
    }, [])

    const handleShow = () => {
        setShowDialog(true)
    }
    const handleHide = () => {
        setShowDialog(false)
    }
    
    const handleConfirmDelete = () => {
        deletePart(part.id)
        .then((response) => {
            if (response.status === 200) {
                router.push(`/vendor/shops/${params.shopId}/manage/inventory`)
            }
        })
        .catch((error) => {
            console.log(error);
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