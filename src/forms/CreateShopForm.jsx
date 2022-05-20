import {Form, Button, Image} from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { postShops } from '../api/api';
import { Formik, ErrorMessage } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import CreateShopSchema from './schemas/CreateShopSchema';

function CreateShopForm() {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [description, setDescription] = useState('')
    const [shopImage, setShopImage] = useState(null)
    const [location, setLocation] = useState('')
    const user = useContext(UserContext).user

    const placeChanged = () => {
        let place = window.autocomplete.getPlace();
        let pos = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        setLocation(place.name)
        window.mapobject.setCenter(pos)
        window.mapobject.setZoom(15)
        if(!window.marker){
            let defaultMarker = new window.google.maps.Marker({
                position: pos,
                map: window.mapobject,
                draggable: true
            })
            window.marker = defaultMarker
        }else{
            window.marker.setPosition(pos)
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
        window.autocomplete = autocomplete
        let mapInput = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -1.308, lng: 36.825},
            zoom:10
        });
        window.mapobject = mapInput
    }

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

    const navigate = useNavigate()
    const createShop = (values, actions) => {
        let shopData = {
            name: values.name,
            number: values.number,
            description: values.description,
            location: location,
            latitude: window.marker.getPosition().lat(),
            longitude: window.marker.getPosition().lng()
        }
        let formData = new FormData();
        for (let name in shopData){
            formData.set(name, shopData[name])
        }
        formData.set('shop_image', values.shopImage)

        postShops(user.token, formData, (response) =>{
            if (response.status === 201){
                actions.setSubmitting(false);
                navigate('/vendor/shops')
            }else{
                actions.setSubmitting(false);
            }
        })
    }
    return (
        <Formik
            validationSchema={CreateShopSchema}
            initialValues={{
                name: name,
                number: number,
                description: description,
                shopImage: null,
                location: location,
            }}
            onSubmit={createShop}
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
                    <Form.Control placeholder="The name of your business" onChange={handleChange}/>
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
                    <PhoneInput style={{
                        width: '100%'
                    }} country={'ke'} value={values.number} onChange={(value) => {
                        setFieldValue('number', value)
                    }} />
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
                    <Form.Control as="textarea" rows="3" placeholder="Some description of your business" onChange={handleChange}/>
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
                        let thumbImg = document.getElementById(`thumb`);
                        let reader = new FileReader();
                        reader.onloadend = () => {
                            thumbImg.src = reader.result;
                            thumbImg.height = 200
                            thumbImg.width = 200
                        };
                        reader.readAsDataURL(event.currentTarget.files[0]);
                        setFieldValue("shopImage", event.currentTarget.files[0]);
                        
                    }}/>
                    <Image
                        id={`thumb`}/>
                    
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
                    <Form.Control type={`text`} placeholder="Where is your business?" onChange={handleChange} />
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
                    CREATE SHOP
                    </Button>
                </Form>
            )}
        />
    )
}

export default CreateShopForm;