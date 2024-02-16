import { useState } from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import DivWithErrorHandling from '@/components/withErrorHandlingHoc';
import LoginSchema from './schemas/LoginSchema';
import formStyles from '@/styles/Form.module.css';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

function UserLoginForm(){
	const {login, updateUser} = useAuthContext()
	let [showError, setShowError] = useState(false)
	let [formErrors, setFormErrors] = useState({})
	let [formState, setformState] = useState({
        email: '',
        password: '',
	})
	const router = useRouter()

	const loginUser = (values, actions) => {
		setformState(values)
		let postData = {...values};
		login(postData, (response)=>{
			actions.setSubmitting(false)
			if (response.status === 200) {
				updateUser()
				router.replace(`/vendor`)
			}else{
				let errors = []
				if(response.status === 422 || response.status === 403){
					errors[0] = response.data.message
				}else{
					errors[0] = response.message
				}
				if(errors){
					setFormErrors(errors)
					setShowError(true)
				}
			}
		})
	}

	return (
		<Container>
			<div className={`user-login ${formStyles.Form}`}>
				<DivWithErrorHandling showError={showError} errors={formErrors}>
					<Formik
						validationSchema={LoginSchema}
						initialValues={formState}
						onSubmit={loginUser}>
							{
								({
									values,
									errors, 
									dirty,
									isSubmitting,
									handleChange,
									handleSubmit,
								})=>(
									<Form onSubmit={handleSubmit}>
										<Form.Group controlId="email">
											<Form.Label>Email address</Form.Label>
											<Form.Control type="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
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
											<Form.Control type="password" placeholder="Password" value={values.password} onChange={handleChange}  />
											<ErrorMessage name="password" render={(msg) => {
											return  <Form.Control.Feedback type="invalid" style={{
											display: `block`
											}}>
											{msg}
											</Form.Control.Feedback>
											}}/>
										</Form.Group>
										<Button variant="primary"  type="submit" disabled={isSubmitting || errors.length > 0 || !dirty}>
										Login
										</Button>
									</Form>
								)
							}
						</Formik>
				</DivWithErrorHandling>
			</div>
			<p>Forgot password? <a href='/auth/recovery'>Reset here</a></p>
			<p>Don't have an account? <a href='/auth/register'>Sign up</a></p>
		</Container>
	)
}

export default UserLoginForm;
