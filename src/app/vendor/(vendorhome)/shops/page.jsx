'use client'
import { useEffect, useState} from 'react';
import {Container, Row, Button, Table} from 'react-bootstrap';
import Loader from '@/components/Loader';
import { getShops } from '@/utils/api';
import {urls} from '@/config/urls'
import Link from 'next/link';
import Image from 'next/image';

function Shops() {
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchShops()
    }, [])

    const fetchShops = () => {
        
        getShops()
        .then((response) => {
            setLoading(false)
            if (response.status === 200){
                setShops(response.data.data.shops)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <Container className="shops-content">
            <Row>
            <Link style={{
                float: "right"
            }} href={`shops/create`}>
            <Button>ADD SHOP</Button>
            </Link>
            </Row>
            <Row>
                <Table>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Name</th>
                        <th>location</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    <Loader loading={loading} />
                    {
                        shops.length > 0 ?
                        shops.map((shop) => {
                            return <tr key={shop.id}>
                                <td><Image width='100' height='100' src={`${urls.apiHost}/${shop.shop_image}`} alt='Shop image' rounded /></td>
                                <td>{shop.name}</td>
                                <td>{shop.location}</td>
                                <td><Link href={`shops/${shop.id}/manage`}>
                                        <Button>Manage</Button>
                                    </Link>
                                    <Link href={`shops/${shop.id}`}>
                                        <Button>View</Button>
                                    </Link>
                                </td>
                            </tr>
                            })
                        :
                        !loading && <p>YOU CURRENTLY DON’T OWN A SHOP</p>
                    }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default Shops;
