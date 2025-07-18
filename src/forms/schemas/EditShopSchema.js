import * as Yup from 'yup';

const rePhoneNumber = /^(?:254|\+254|0)?(?:(?:(?:1(?:(?:0[0-2])|(?:1[0-5])))|(?:7(?:(?:0[1-9])|(?:[12356789][0-9])|(?:4[0-8]))))[0-9]{6})$/
// const FILE_SIZE = 16 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

const EditShopSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    number: Yup.string()
      .matches(rePhoneNumber, 'Phone number is not valid')
      .required('Required field'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    location: Yup.string()
      .required('Required field'),
    // shopImage: Yup.mixed()
    //   .test('fileFormat', 'Unsupported file format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
    // //   .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
    //   .notRequired(),
  });

export default EditShopSchema;