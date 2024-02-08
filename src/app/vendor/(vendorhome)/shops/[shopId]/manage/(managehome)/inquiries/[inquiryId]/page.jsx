'use client'
import {useState, useEffect}from 'react'
import {Container,Row, Col, Image, Button, Form, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import {urls} from '@/config/urls'
import { getInquiry, postReplyInquiry } from '@/utils/api';

function InquiryView({params}){
    const [inquiry, setInquiry] = useState({})
    const [reply, setReply] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const fetchInquiry = () => {
        getInquiry(params.inquiryId)
        .then((response) => {
            if(response.status === 200){
                setInquiry(response.data.data.inquiry)
            }
        })
        .catch((error) => {
            console.log('Error getting inquiry');
            console.log(error);
        })
    }
    useEffect(()=>{
        fetchInquiry()
    }, [])

    let totalReplies = 0
    if(inquiry.replies && inquiry.replies.length > 0){
        totalReplies = inquiry.replies.length
    }
    const sendReply = (event) => {
        event.preventDefault()
        setSubmitting(true)
        let payload = {
            reply
        }
        postReplyInquiry(inquiry.id, payload)
        .then((response) => {
            if(response.status === 201){
                setSubmitting(false)
                setReply('')
                setInquiry(response.data.data.inquiry)
            }
        })
        .catch((error) => {
            console.log('Error posting reply');
            console.log(error);
        })
    }
    return <Container>
        <Row style={{
            flexDirection: `column`
        }}>
            <Col>
            <p>{inquiry.query}</p>
            </Col>
            <Col style={{
                display: `flex`,
                flexDirection:`column`
            }}>
            <p>Request for:</p><br />
            {
                (!inquiry.part) ? ''
                : <Image src={`${urls.apiHost}/${inquiry.part.part_image}`} width={'75px'} height={'75px'} />
            }
            <br />
            {
                (inquiry.part === null) ? ''
                : inquiry.part.title
            }
            <br /><br />
            <Image src={`${urls.apiHost}/${inquiry.shop.shop_image}`} width={'75px'} height={'75px'} />
            <br />
            {inquiry.shop.name}
            <span><FontAwesomeIcon icon={faClock}/>{`  ${new Date(inquiry.created_at).toDateString()}`}</span>
            </Col>
            <Col>
            <p>{`Replies (${totalReplies})`}</p>
            <div className={`replies`}>
                { totalReplies > 0 ? (
                    inquiry.replies.map((reply, indx)=>{return <Card key={indx}>
                        <Card.Header>{`By: ${reply.user.name}`}</Card.Header>
                        <Card.Body>{reply.reply}</Card.Body>
                    </Card>})
                ):<p></p>
                }
            </div>
            </Col>
            <Col>
            <Form>
                <Form.Group controlId="formBasicReply">
                <Form.Label>New Reply</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Write a reply.." value={reply} onChange={(event) => setReply(event.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={sendReply} disabled={submitting?true:false}>
                {submitting?'Submitting':'Send'}
                </Button>
            </Form>
            </Col>
        </Row>
    </Container>
}

export default InquiryView;
