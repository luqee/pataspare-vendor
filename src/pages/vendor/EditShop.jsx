import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css'
import { deleteShops, postUpdateShops } from '../../api/api';
import {urls} from '../../config/config';
import { Formik, ErrorMessage } from 'formik';
import EditShopSchema from '../../forms/schemas/EditShopSchema'
import {Container,Row, Col, Form, Button, Image} from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import DeleteShopModal from '../../components/vendor/DeleteShopModal';

function EditShop(){
    const user = useContext(UserContext).user
    const location = useLocation()
    const [shop, setShop] = useState(location.shop)
    const [newLocation, setNewLocation] = useState(shop.location)
    const [map, setMap] = useState('')
    const [marker, setMarker] = useState('')
    const [autoComplete, setAutoComplete] = useState('')
    const [showDialog, setShowDialog] = useState(false)

    const setupMap = () => {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                initMap();
            })
        } else {
            initMap();
        }
    }
    
    useEffect(()=>{
        setupMap()
    }, [])

    const placeChanged = () => {
        let place = autoComplete.getPlace();
        let pos = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        setNewLocation(place.name)
        map.setCenter(pos)
        map.setZoom(15)
        if(marker === ''){
            let defaultMarker = new window.google.maps.Marker({
                position: pos,
                map: map,
                draggable: true
            })
            setMarker(defaultMarker)
        }else{
            marker.setPosition(pos)
        }
        
    }
    const initMap = () => {
        let locationInput = document.getElementById('location');
        let options = {
            componentRestrictions: {country: 'ke'}
          };
        let autocomplete = new window.google.maps.places.Autocomplete(locationInput, options);
        autocomplete.setFields(['name', 'geometry.location']);
        autocomplete.addListener('place_changed', placeChanged);
        setAutoComplete(autocomplete)
        let mapInput = new window.google.maps.Map(document.getElementById('map'));
        let shopLocation = {lat: parseFloat(shop.latitude), lng: parseFloat(shop.longitude)}
        setMap(mapInput)
        showShopLocation(shopLocation, mapInput)
    }

    const showShopLocation = (pos, map) => {
        map.setCenter(pos)
        map.setZoom(15)
        if(marker === ''){
            let defaultMarker = new window.google.maps.Marker({
                position: pos,
                map: map,
                draggable: true
            })
            setMarker(defaultMarker)
        }else{
            marker.setPosition(pos)
        }
    }
    const showThumb = (event) =>{
        let thumbImg = document.getElementById(`thumb`);
        let reader = new FileReader();
        reader.onloadend = () => {
            thumbImg.src = reader.result;
            thumbImg.height = 200
            thumbImg.width = 200
        };
        reader.readAsDataURL(event.currentTarget.files[0]);
    }

    const navigate = useNavigate()
    const editShop = (values, actions) => {
        let data = {}
        if(values.name !== shop.name){
            data['name'] = values.name
        }
        if(values.number !== shop.number){
            data['number'] = values.number
        }
        if(values.description !== shop.description){
            data['description'] = values.description
        }
        if(values.location !== shop.location){
            data['location'] = values.location
            data['latitude'] = marker.getPosition().lat()
            data['longitude'] = marker.getPosition().lng()
        }
        
        let formData = new FormData();
        for (let name in data){
            formData.set(name, data[name])
        }
        if(values.shopImage !== null){
            formData.set('shop_image', values.shopImage)
        }
        postUpdateShops(user.token, shop.id, formData, (response) => {
            if (response.status === 201){
                actions.setSubmitting(false);
                navigate('/vendor/shops')
            }else{
                actions.setSubmitting(false);
                console.log(error);
            }
        })
    }
    const handleShow = () => {
        setShowDialog(true)
    }
    const handleHide = () => {
        setShowDialog(false)
    }
    const handleConfirmDelete = () => {
        deleteShops(user.token, shop.id, (response)=>{
            if (response.status === 200){
                navigate('/vendor/shops')
            }
        })
        setShowDialog(false)
    }
    let initialValues = {
        name: shop.name,
        number: shop.number,
        description: shop.description,
        shopImage: null,
        location: newLocation,
    }
    return (
        <Container>
            <Button variant="primary" onClick={handleShow}>
                Delete
            </Button>
            <Row className="justify-content-md-center">
            
            <DeleteShopModal 
                show={showDialog} 
                onConfirm={handleConfirmDelete} 
                onHide={handleHide}
                shop={shop}
            />
                <Col lg={7}>
                <Formik
            validationSchema={EditShopSchema}
            initialValues={initialValues}
            onSubmit={editShop}
            render={({
                values,
                setFieldValue,
                errors, 
                dirty,
                isSubmitting,
                handleChange,
                handleSubmit,
            }) =>(
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                    <Form.Label>Business Name:</Form.Label>
                    <Form.Control value={values.name} onChange={handleChange}/>
                    <ErrorMessage name="name" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="number">
                    <Form.Label>Business Number:</Form.Label>
                    <div style={{
                        width: '100%'
                    }}>
                        <PhoneInput defaultCountry={'ke'} value={values.number} onChange={(value) => {
                            setFieldValue('number', value)
                        }} />
                    </div>
                    <ErrorMessage name="number" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows="3" value={values.description} onChange={handleChange}/>
                    <ErrorMessage name="description" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="shopImage">
                    <Form.Label>Shop Image:</Form.Label>
                    <Form.Control type="file" placeholder="Upload shop image" onChange={(event) => {
                        showThumb(event)
                        setFieldValue("shopImage", event.currentTarget.files[0]);
                        
                    }}/>
                    <a target="_blank" href={`${urls.hostRoot}/${shop.shop_image}`} rel="noopener noreferrer">
                    <Image
                        id={`thumb`} width="200px" height="200px" src={`${urls.hostRoot}/${shop.shop_image}`}/>
                    </a>
                    <ErrorMessage name="shopImage" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="location">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control type={`text`} value={values.location} onChange={(event)=>{
                        // setFieldValue('location',event.value)
                        handleChange(event)
                    }} />
                    <ErrorMessage name="location" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="map">
                    <Form.Label>Selet On Map:</Form.Label>
                    <div style={{ width: 400, height: 400 }} className="map" id="map"></div>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                    UPDATE
                    </Button>
                </Form>
            )}
        />
                </Col>
            </Row>
        </Container>
    )
}

export default EditShop;