import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function InquiriesTable({inquiries}){
    return (
        <Table>
            <thead>
                <tr>
                <th>Query</th>
                <th>Product</th>
                <th>Store</th>
                <th>Replies</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                (inquiries && inquiries.length > 0) ?
                inquiries.map((inquiry, indx) => {
                    let num_of_replies = 0
                    if(inquiry.replies && inquiry.replies.length > 0){
                        num_of_replies = inquiry.replies.length
                    }
                    return <tr key={indx}>
                        <td>{inquiry.query}</td>
                        <td>{(inquiry.part === null) ? '-': inquiry.part.name}</td>
                        <td>{(inquiry.shop === null) ? '-': inquiry.shop.name}</td>
                        <td>{num_of_replies}</td>
                        <td>
                        navigate()
                        <Link to={{
                            pathname: `/vendor/shops/${inquiry.shop.id}/manage/inquiries/${inquiry.id}`,
                            state: {inquiry: inquiry }
                        }}>
                        <Button>View</Button>
                        </Link>
                            
                        </td>
                    </tr>
                    })
                :<p>No Inquiries</p>
            }
            </tbody>
        </Table>
    )
}

export default InquiriesTable;