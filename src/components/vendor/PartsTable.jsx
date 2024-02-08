import {Image, Button, Table} from 'react-bootstrap';
import {urls} from '@/config/urls'
import Link from 'next/link';

function PartsTable({parts}){
    return (
        <Table>
            <thead>
                <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                (parts && parts.length > 0) ? parts.map((part, indx) => {
                    return <tr key={indx}>
                        <td><Image width='100' height='100' src={`${urls.apiHost}/${part.part_image}`} rounded /></td>
                        <td>{part.title}</td>
                        <td>{part.price}</td>
                        <td>{part.stock}</td>
                        <td>
                            <Link href={{
                                pathname: `/vendor/shops/${part.shop.id}/manage/inventory/${part.id}`
                            }}>
                            <Button>View</Button>
                            </Link>
                        </td>
                    </tr>
                    })
                    : <tr><td rowSpan={5}>No Inventory</td></tr>
            }
            </tbody>
        </Table>
    )
}

export default PartsTable;
