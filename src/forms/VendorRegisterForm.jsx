import {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import VendorSignupSchema from '@/schemas/VendorSignupSchema';
import DivWithErrorHandling from '@/components/withErrorHandlingHoc';
import formStyles from '@/styles/Form.module.scss';
import { postRegister } from '../utils/api';
import { useRouter } from 'next/navigation';

function VendorRegisterForm(){
	let [showError, setShowError] = useState(false)
	let [formErrors, setFormErrors] = useState({})
	let [formState, setformState] = useState({
		name: '',
        number: '',
        email: '',
        password: '',
        passwordConfirm: '',
	})

	const router = useRouter()

	const onSubmitForm = (values, actions) => {
		setformState(values)
        let postData = { ...values ,role: `vendor`}
		postRegister(postData)
		.then((response)=>{
			actions.setSubmitting(false);
			if (response.status === 201) {
				router.push(`/auth/email?email=${response.data.data.mail}`)
			}
			setShowError(true)
			setFormErrors(response.errors)
		})
		.catch((error)=>{
			console.log(error);
		})
    }

  return (
	<div className={`dealer-register ${formStyles.Form}`}>
	  <DivWithErrorHandling showError={showError} errors={formErrors} >
		  <Formik
			validationSchema={VendorSignupSchema}
			initialValues={formState}
			onSubmit={onSubmitForm}>
				{
					({
						values,
						setFieldValue,
						touched,
						errors, 
						dirty,
						isSubmitting,
						handleChange,
						handleBlur,
						handleSubmit,
					}) =>(
						<Form onSubmit={handleSubmit}>
						<Form.Group controlId="name">
							<Form.Label>User Name</Form.Label>
							<Form.Control name="name" type="text" placeholder="User name" value={values.name} onChange={handleChange} />
							<ErrorMessage name="name" render={(msg) => {
							return  <Form.Control.Feedback type="invalid" style={{
							display: `block`
							}}>
							{msg}
							</Form.Control.Feedback>
							}}/>
						</Form.Group>
						<Form.Group controlId="number">
							<Form.Label>Phone Number</Form.Label>
							<PhoneInput style={{
								width: '100%'
							}} country={'ke'} value={values.number} onChange={(value) => {
								setFieldValue('number', value)
							}} />
							<ErrorMessage name="number" render={(msg) => {
							return  <Form.Control.Feedback type="invalid" style={{
							display: `block`
							}}>
							{msg}
							</Form.Control.Feedback>
							}} />
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
							<Form.Text className="text-muted">
							We'll never share your email with anyone else.
							</Form.Text>
							<ErrorMessage name="email" render={(msg) => {
							return  <Form.Control.Feedback type="invalid" style={{
							display: `block`
							}}>
							{msg}
							</Form.Control.Feedback>
							}} />
							
						</Form.Group>
						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" value={values.password} onChange={handleChange} />
							<ErrorMessage name="password" render={(msg) => {
							return  <Form.Control.Feedback type="invalid" style={{
							display: `block`
							}}>
							{msg}
							</Form.Control.Feedback>
							}}/>
						</Form.Group>
						<Form.Group controlId="passwordConfirm">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password" placeholder="Password Confirmation" value={values.passwordConfirm} onChange={handleChange} />
							<ErrorMessage name="passwordConfirm" render={(msg) => {
							return  <Form.Control.Feedback type="invalid" style={{
							display: `block`
							}}>
							{msg}
							</Form.Control.Feedback>
							}} />
						</Form.Group>
						<Button variant="primary" type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
						Register
						</Button>
						</Form>
					)
				}
			</Formik>
	  </DivWithErrorHandling>
	</div>
  );
}

export default VendorRegisterForm;