import { ErrorMessage, Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Select from 'react-select';
import { getBrands, getCategories, postUpdatePart } from "../api/api"
import { UserContext } from "../App"
import EditPartSchema from "./schemas/EditPartSchema"
import {urls} from '../config/config'
import { Button, Form, Image } from "react-bootstrap";

function EditPartForm({part}){
    const params = useParams()
    const user = useContext(UserContext).user
    const [brands, setBrands] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [selectedBrand, setSelectedBrand] = useState([])
    const [modelOptions, setModelOptions] = useState([])
    const [selectedModels, setSelectedModels] = useState([])
    const [tags, setTags] = useState([])
    const [tagOptions, setTagOptions] = useState([])
    const [yearOptions, setYearOptions] = useState([])
    const [selectedYears, setSelectedYears] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [disabledModel, setDisabledModel] = useState(false)
    const [disabledYear, setDisabledYear] = useState(false)

    const fetchBrands = () => {
        getBrands((response)=>{
            if (response.status === 200){
                setBrands(response.data.brands)
                let brandSelectOptions = response.data.brands.map((brand) => {
                    return {
                        value: brand.id,
                        label: brand.name
                    }
                })
                let anyOption = {
                    value: 0,
                    label: 'Any'
                }
                brandSelectOptions.unshift(anyOption)
                setBrandOptions(brandSelectOptions)
            }
        })
    }

    const fetchCategories = () => {
        getCategories((response)=>{
            if (response.status === 200){
                setTags(response.data.categories)
                let tagSelectOptions = response.data.categories.map((tag) => {
                    return {
                        value: tag.id,
                        label: tag.name
                    }
                })
                setTagOptions(tagSelectOptions)
            }
        })
    }

    useEffect(()=>{
        if(Object.keys(part).length > 0){
            setSelectedBrand(brandOptions.find(brand => brand.value == part.brand_id))

            const getSelectedModels = () => {
                return Array.from(part.models, (model)=> {
                    return {
                        value: model.id,
                        label: model.name
                    }
                })
            }
            let partModels = getSelectedModels()
            setSelectedModels(partModels)

            let partBrand = brands.find((brand) => brand.id == part.brand_id )
            if(partBrand){
                let modelSelectOptions = Array.from(partBrand.models, (model)=>{
                    return {
                        value: model.id,
                        label: model.name
                    }
                })
                setModelOptions(modelSelectOptions)
            }
            let partYears = Array.from(part.years, (year) => {
                return {
                    value: year.year,
                    label: year.year
                }
            })
            setSelectedYears(partYears)

            let yearOptions = []
            let today = new Date();
            for(let year = parseInt(today.getFullYear()); year >= 1990; year--){
                yearOptions.push({
                    value: year,
                    label: year
                })
            }
            setYearOptions(yearOptions)

            let partCategories = Array.from(part.categories, (category)=>{
                return {
                    value: category.id,
                    label:category.name
                }
            })
            setSelectedTags(partCategories)
        }
    }, [part])

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
            let selectedBrand = brands.find((brand) => brand.id === selected.value)
            if(selectedBrand){
                setModelOptions(Array.from(selectedBrand.models, (model) => {
                    return {
                        value: model.id,
                        label:model.name
                    }
                }))
            }
        }
    }

    const navigate = useNavigate()
    const editPart = (values, actions) => {
        let formData = new FormData();
        const filterFields = ['brand', 'tags', 'models', 'years', 'name']
        for (let value in values) {
            if (values.hasOwnProperty(value) && filterFields.indexOf([value]) === -1) {
                if(values[value] != part[value]){
                    formData.set([value], values[value])
                }
            }
        }
        if(values.name != part.title){
            formData.set('title', values.name)
        }
        if(values.brand.value != part.brand_id){
            formData.set('brand_id', values.brand.value)
        }
        if(values.models != null){
            let models = Array.from(values.models, (model)=>parseInt(model.value))
            formData.set('models', models)
        }
        if(values.tags != null){
            let tags = Array.from(values.tags, (tag) => parseInt(tag.value))
            formData.set('categories', tags)
        }
        if(values.years != null){
            let years = Array.from(values.years, (year) => parseInt(year.value))
            formData.set('years', years)
        }
        if(values.partImage !=null){
            formData.set('part_image', values.partImage)
        }

        postUpdatePart(user.token, params.partId, formData, (response) => {
            if (response.status === 201){
                actions.setSubmitting(false);
                navigate(`/vendor/shops/${params.shopId}/manage/inventory`)
            }else{
                actions.setSubmitting(false);
            }
        })
    }
    
    let initialState = {
        brand: selectedBrand,
        models: selectedModels,
        years: selectedYears,
        tags: selectedTags,
        name: part.title,
        description: part.description,
        partImage: null,
        price: part.price,
        stock: part.stock,
    }
    
    return (
        <Formik
            validationSchema={EditPartSchema}
            enableReinitialize={true}
            initialValues={initialState}
            onSubmit={editPart}>{
                ({
                    values,
                    setFieldValue,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control placeholder="Title" value={values.name} onChange={handleChange}/>
                    <ErrorMessage name="name" render={(msg) => {
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
                        value={values.brand}
                        options={brandOptions}
                        onChange={(selected) => {
                            setFieldValue('brand', selected);
                            setFieldValue('models', null);
                            if(selected.value === 0){
                                setFieldValue('years', null);
                            }
                            handleBrand(selected);
                        }}
                        
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
                    <Form.Control placeholder="Price" value={values.price} onChange={handleChange}/>
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
                    <Form.Control type="number" min="1" placeholder="In stock" value={values.stock} onChange={handleChange}/>
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
                    <Form.Control as="textarea" rows="3" value={values.description} placeholder="Some description of the part item" onChange={handleChange}/>
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
                    <a target="_blank" href={`${urls.hostRoot}/${part.part_image}`} rel="noopener noreferrer">
                    <Image
                        id={`thumb`} width="200px" height="200px" src={`${urls.hostRoot}/${part.part_image}`}/>
                    </a>
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
                    {isSubmitting ? 'Submitting': 'EDIT'}
                    </Button>
                    </Form>
                )
            }
        </Formik>
    )
}

export default EditPartForm