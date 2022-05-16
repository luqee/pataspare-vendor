import {Link} from 'react-router-dom';
import {Image, Button, Table} from 'react-bootstrap';
import {urls} from '../../config/config';

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
                parts.length > 0 ? parts.map((part, indx) => {
                    return <tr key={indx}>
                        <td><Image width='100' height='100' src={`${urls.hostRoot}/${part.part_image}`} rounded /></td>
                        <td>{part.title}</td>
                        <td>{part.price}</td>
                        <td>{part.stock}</td>
                        <td>
                            <Link to={{
                                pathname: `${part.id}`,
                                state: {part: part}
                            }}>
                            <Button>View</Button>
                            </Link>
                        </td>
                    </tr>
                    })
                    : <p>No Inventory</p>
            }
            </tbody>
        </Table>
    )
}

export default PartsTable;
