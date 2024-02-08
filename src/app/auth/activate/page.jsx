'use client'
import { useEffect, useState } from 'react';
import {Container, Row } from 'react-bootstrap';
import Loader from '@/components/Loader';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getVerifyMail } from '@/utils/api';

function Activate() {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const verify = ()=>{
        let query = `${pathname}?${searchParams}`
        console.log(query);
        // getVerifyMail(query)
        // .then((response) => {
        //     setLoading(false)
        //     if (response.status === 200) {
        //         router.replace(`/auth/login`)
        //     }else{
        //         console.log('Error activating');
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
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
