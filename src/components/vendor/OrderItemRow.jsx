import {useState} from 'react';
import {Image, Button} from 'react-bootstrap';
import Select from 'react-select';
import {putOrder} from '@/utils/api'
import {urls} from '@/config/urls'

function OrderItemRow(props){
    const [item, setItem] = useState(props.item)
    let [status, setStatus] = useState({
        value: item.status,
        label: item.status,
    })
    let [statusChanged, setStatusChanged] = useState(false)
    let [updating, setUpdating] = useState(false)
    let options = ['processing', 'completed', 'cancelled']
    let statusOptions = options.map((item) => {
        return {
            value: item,
            label: item
        }
    })

    const handleStatus = (selected) => {
        if(selected.value !== item.status){
            setStatusChanged(true)
        }else{
            setStatusChanged(false)
        }
        setStatus(selected);
    }

    const changeStatus = () => {
        setUpdating(true)
        let postData = {
            status: status.value
        }
        putOrder(item.id, postData)
        .then((response) => {
            setUpdating(false)
            if (response.status === 201){
                setItem(response.data.data.order_item)
                setStatusChanged(false)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return <tr>
            <td><Image width={'60px'} height={'60px'} src={`${urls.apiHost}/${item.part.part_image}`} /> </td>
            <td>{item.part.title}</td>
            <td>{item.shop.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.quantity * item.price}</td>
            <td>
                <div style={{
                    display: 'flex'
                }}>
                    <div style={{
                        width: `125px`
                    }}>
                        <Select
                            placeholder={`Status`}
                            options={statusOptions}
                            onChange={handleStatus}
                            value={status}
                        />
                    </div>
                <span>{`  `}</span>
                <Button size={"sm"} onClick={changeStatus} disabled={(!statusChanged)? true: false}>{updating?'Updating':'Update'}</Button>
                </div>
            </td>
        </tr>
}

export default OrderItemRow;