import * as Yup from 'yup';

const rePhoneNumber = /^(?:254|\+254|0)?(?:(?:(?:1(?:(?:0[0-2])|(?:1[0-5])))|(?:7(?:(?:0[1-9])|(?:[12356789][0-9])|(?:4[0-8]))))[0-9]{6})$/

const VendorSignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .required('Required field'),
  number: Yup.string()
    .matches(rePhoneNumber, 'Phone number is not valid')
    .required('Required field'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required field'),
  password: Yup.string()
    .min(5, 'Should contain at least five characters')
    .required('Required field'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required field'),
});

export default VendorSignupSchema;