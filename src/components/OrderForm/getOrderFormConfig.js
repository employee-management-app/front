export const getOrderFormConfig = (yup, values = {}) => ({
  email: {
    value: values.email || '',
    validation: yup.string().email().max(100).required(),
  },
  name: {
    value: values.name || '',
    validation: yup.string().max(100).required(),
  },
  surname: {
    value: values.surname || '',
    validation: yup.string().max(100).required(),
  },
  phone: {
    value: values.phone || '',
    validation: yup.string().min(6).max(100).required(),
  },
  productType: {
    value: values.productType || null,
    validation: yup.string().nullable().required(),
  },
  code: {
    value: values.code || '',
    validation: yup.string().matches('^[0-9]{2}-[0-9]{3}', 'Invalid post code (xx-xxx)').required(),
  },
  city: {
    value: values.city || '',
    validation: yup.string().required(),
  },
  street: {
    value: values.street || '',
    validation: yup.string().required(),
  },
  house: {
    value: values.house || '',
    validation: yup.string().required(),
  },
  flat: {
    value: values.flat || '',
    validation: yup.string(),
  },
  message: {
    value: values.description || values.message || '',
    validation: yup.string(),
  },
});