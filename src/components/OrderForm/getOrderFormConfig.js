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
  type: {
    value: values.type || null,
    validation: yup.string().nullable().required(),
  },
  code: {
    value: values.address ? values.address.code : '',
    validation: yup.string().matches('^[0-9]{2}-[0-9]{3}', 'Invalid post code (xx-xxx)').required(),
  },
  city: {
    value: values.address ? values.address.city : '',
    validation: yup.string().required(),
  },
  street: {
    value: values.address ? values.address.street : '',
    validation: yup.string().required(),
  },
  house: {
    value: values.address ? values.address.house : '',
    validation: yup.string().required(),
  },
  flat: {
    value: values.address ? values.address.flat : '',
    validation: yup.string(),
  },
  assignedEmployee: {
    value: values.assignedEmployee ? values.assignedEmployee._id : null,
  },
  completionDate: {
    value: values.completionDate || null,
  },
  message: {
    value: values.message || '',
    validation: yup.string(),
  },
});
