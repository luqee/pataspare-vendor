import { useContext, useEffect, useState} from 'react';
import { getShops } from '../../api/api';
import {urls} from '../../config/config';
import {Container, Row, Button, Table, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Loader from '../../components/Loader';
import { UserContext } from '../../App';

function Shops() {
    const [shops, setShops] = useState([])
    const [loading, setLoading] = useState(true);
    const userContext = useContext(UserContext)

    useEffect(()=>{
        fetchShops()
    }, [])

    const fetchShops = () => {
        getShops(userContext.user.token, (response) => {
            if (response.status === 200){
                setShops(response.data.shops)
                setLoading(false)
            }
        })
    }
    return (
        <Container className="shops-content">
            <Row>
            <Link style={{
                float: "right"
            }} to={`create`}>
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
                                <td><Image width='100' height='100' src={`${urls.hostRoot}/${shop.shop_image}`} rounded /></td>
                                <td>{shop.name}</td>
                                <td>{shop.location}</td>
                                <td><Link to={{
                                    pathname: `manage/${shop.id}`,
                                    state: {shop: shop}
                                }}>
                                        <Button>Manage</Button>
                                    </Link>
                                    <Link to={{
                                        pathname: `${shop.id}`,
                                        state: {shop: shop}
                                    }}>
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
