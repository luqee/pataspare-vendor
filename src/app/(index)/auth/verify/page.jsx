'use client'
import { useEffect, useState } from 'react';
import {Container, Row } from 'react-bootstrap';
import Loader from '@/components/Loader';
import { useRouter, useSearchParams } from 'next/navigation';
import { getVerify } from '@/utils/api';

function Activate() {
    const [loading, setLoading] = useState(true)
    const queryString = useSearchParams()
    const router = useRouter()

    const verify = ()=>{
        let url = null
        if(url = queryString.get('q')){
            let query = new URLSearchParams()
            query.set('url', url)
            getVerify(query.toString())
            .then((response) => {
                setLoading(false)
                if (response.status === 200){
                    router.push(`/auth/login`)
                }else {
                    console.log('Error activating')
                }
            })
            .catch((error) => {
                setLoading(false)
                console.log(`Caught error--> ${error}`);
            });
        }
    }

    useEffect(()=>{
        verify()
    }, [])

    return (
        <Container>
            <Row style={{
                justifyContent: 'center'
            }}>
            <Loader loading={loading} />
            {
                (loading) ? (
                    <p>Email being verified, you will be redirected...</p>
                ):( !loading && <p>Verification failed.</p>
                )
            }
            </Row>
        </Container>
    )
}

export default Activate;
