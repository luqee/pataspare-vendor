import {Table} from 'react-bootstrap';
import OrderItemRow from './OrderItemRow';

function OrderItemsTable({orderItems}){
    
    return (
        <Table>
            <thead>
                <tr>
                <th></th>
                <th>Item</th>
                <th>Shop</th>
                <th>Cost</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                (orderItems && orderItems.length > 0) ?
                orderItems.map((order) => {
                    return <OrderItemRow key={order.id} item={order} />
                    })
                :
                <p>NO ORDERS CURRENTLY</p>
            }
            </tbody>
        </Table>
    )
}

export default OrderItemsTable;