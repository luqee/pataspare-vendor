import {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css'
import VendorSignupSchema from './schemas/VendorSignupSchema';
import DivWithErrorHandling from '../components/withErrorHandlingHoc';
import { postRegister } from '../api/auth';

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

	const navigate = useNavigate()

	const onSubmitForm = (values, actions) => {
        let postData = { ...values ,role: `dealer`}
        postRegister(postData, (response)=>{
            if (response.status === 201) {
                actions.setSubmitting(false);
                navigate('/auth/email', {replace: true, state: {email: response.data.data.mail}})
            }
			actions.setSubmitting(false);
			setShowError(true)
			setFormErrors(response.errors)
        })
    }

  return (
	<div className={`dealer-register ${formStyles.Form}`}>
	  <DivWithErrorHandling showError={showError} errors={formErrors} >
		  <Formik
			validationSchema={VendorSignupSchema}
			initialValues={formState}
			onSubmit={onSubmitForm}
			render={({
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
					}} defaultCountry={'ke'} value={values.number} onChange={(value) => {
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
			)}
			/>
	  </DivWithErrorHandling>
	</div>
  );
}

export default VendorRegisterForm;