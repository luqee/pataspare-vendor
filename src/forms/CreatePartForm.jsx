import {Form, Button, Image} from 'react-bootstrap';
import { getBrands, getCategories, postPart } from '../api/api';
import Select from 'react-select';
import { Formik, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import CreatePartSchema from './schemas/CreatePartSchema';

function CreatePartForm() {
    const params = useParams()
    const user = useContext(UserContext).user
    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [tags, setTags] = useState([])
    const [disabledModel, setDisabledModel] = useState(false)
    const [disabledYear, setDisabledYear] = useState(false)
    
    const fetchBrands = () => {
        getBrands((response)=>{
            if (response.status === 200){
                setBrands(response.data.brands)
            }
        })
    }

    const fetchCategories = () => {
        getCategories((response)=>{
            if (response.status === 200){
                setTags(response.data.categories)
            }
        })
    }
    useEffect(()=>{
        fetchBrands()
        fetchCategories()
    }, [])

    const handleBrand = (selected) => {
        if(selected.value === 0){
            setDisabledModel(true)
            setDisabledYear(true)
        }else{
            setDisabledModel(false)
            setDisabledYear(false)
            brands.forEach((brand) => {
                if (brand.id === selected.value){
                    setModels(brand.models)
                }
            })
        }
    }
    const navigate = useNavigate()
    const createPart = (values, actions) => {
        let selectedModels = null
        if(values.brand.value > 0){
            selectedModels = []
            values.models.map((item) => selectedModels.push(item.value))
        }

        let selectedTags = Array.from(values.tags, (tag) => parseInt(tag.value))
        let selectedYears = null
        if(values.years !== null){
            selectedYears = Array.from(values.years, (year) => parseInt(year.value))
        }
        let partData = {
            title: values.name,
            brand_id: values.brand.value,
            models: selectedModels,
            years: selectedYears,
            price: values.price,
            stock: values.stock,
            part_number: values.part_number,
            description: values.description,
            categories: selectedTags,
            shop_id: params.shopId
        }
        let formData = new FormData();
        for (let name in partData){
            formData.set(name, partData[name])
        }
        formData.set('part_image', values.partImage)

        postPart(user.token, formData, (response) =>{
            if (response.status === 201){
                actions.setSubmitting(false);
                navigate(`/vendor/shops/${params.shopId}/manage/inventory`, {state: {part: response.data.part}})
            }
        })
    }
    let brandOptions = brands.map((brand) => {
        return {
            value: brand.id,
            label: brand.name
        }
    })
    let anyOption = {
        value: 0,
        label: 'any'
    }
    brandOptions.unshift(anyOption)
    let modelOptions = models.map((model) => {
        return {
            value: model.id,
            label: model.name
        }
    })
    let tagOptions = tags.map((tag) => {
        return {
            value: tag.id,
            label: tag.name
        }
    })
    let today = new Date();
    let yearOptions = []
    for(let year = parseInt(today.getFullYear()); year >= 1990; year--){
        yearOptions.push({
            value: year,
            label: year
        })
    }
    return (
        <Formik
            validationSchema={CreatePartSchema}
            initialValues={{
                brand: null,
                models: null,
                years: null,
                tags: null,
                name: '',
                description: '',
                partImage: null,
                part_number: '',
                price: '',
                stock: '',
            }}
            onSubmit={createPart}
            render={({
                values,
                setFieldValue,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleSubmit,
            }) => {
                return <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control placeholder="Title" onChange={handleChange}/>
                    <ErrorMessage name="name" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="part_number">
                    <Form.Label>Part Number:</Form.Label>
                    <Form.Control placeholder="SKU" onChange={handleChange}/>
                    <ErrorMessage name="part_number" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="brand">
                    <Form.Label>Brand:</Form.Label>
                    <Select
                        placeholder={`Select Make`}
                        options={brandOptions}
                        onChange={(selected) => {
                            setFieldValue('brand', selected);
                            setFieldValue('models', null);
                            if(selected.value === 0){
                                setFieldValue('years', null);
                            }
                            handleBrand(selected);
                        }}
                        value={values.brand}
                    />
                    <ErrorMessage name="brand" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="models">
                    <Form.Label>Models:</Form.Label>
                    <Select
                        value={values.models}
                        placeholder={`Select Model`}
                        onChange={(selected) => {
                            setFieldValue('models', selected)
                        }}
                        options={modelOptions}
                        isMulti={true}
                        isDisabled={disabledModel}
                    />
                    <ErrorMessage name="models" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="years">
                    <Form.Label>Years:</Form.Label>
                    <Select
                        value={values.years}
                        placeholder={`Years`}
                        onChange={(selected) => {
                            setFieldValue('years', selected)
                        }}
                        options={yearOptions}
                        isMulti={true}
                        isDisabled={disabledYear}
                    />
                    <ErrorMessage name="years" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="price">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control placeholder="Price" onChange={handleChange}/>
                    <ErrorMessage name="price" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="stock">
                    <Form.Label>Stock:</Form.Label>
                    <Form.Control type="number" min="1" placeholder="In stock" onChange={handleChange}/>
                    <ErrorMessage name="stock" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Some description of the part item" onChange={handleChange}/>
                    <ErrorMessage name="description" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="partImage">
                    <Form.Label>Part Image:</Form.Label>
                    <Form.Control type="file" placeholder="Upload image" onChange={(event) => {
                        let thumbImg = document.getElementById(`thumb`);
                        let reader = new FileReader();
                        reader.onloadend = () => {
                            thumbImg.src = reader.result;
                            thumbImg.height = 200
                            thumbImg.width = 200
                        };
                        reader.readAsDataURL(event.currentTarget.files[0]);
                        setFieldValue("partImage", event.currentTarget.files[0]);

                    }}/>
                    <Image
                        id={`thumb`}/>
                    <ErrorMessage name="partImage" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Form.Group controlId="tags">
                    <Form.Label>Tags:</Form.Label>
                    <Select
                        value={values.tags}
                        placeholder={`Tags`}
                        onChange={(selected) => {
                            setFieldValue('tags', selected)
                        }}
                        options={tagOptions}
                        isMulti={true}
                    />
                    <ErrorMessage name="tags" render={(msg) => {
                        return <Form.Control.Feedback type="invalid" style={{
                            display: `block`
                          }}>
                        {msg}
                        </Form.Control.Feedback>
                    }}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
                    {isSubmitting ? 'Submitting': 'CREATE PART'}
                    </Button>
                </Form>
            }}
        />
    )
}

export default CreatePartForm;
