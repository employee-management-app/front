export const getOrderFormConfig = (yup, values = {}) => ({
  fullAddress: {
    value: values.address?.fullAddress || '',
    validation: yup?.string().max(300).required(),
  },
  email: {
    value: values.email || '',
    validation: yup?.string().email().max(100),
  },
  name: {
    value: values.name || '',
    validation: yup?.string().max(100),
  },
  surname: {
    value: values.surname || '',
    validation: yup?.string().max(100),
  },
  phone: {
    value: values.phone || '',
    validation: yup?.string().min(6).max(100).required(),
  },
  type: {
    value: values.type || null,
    validation: yup?.string().nullable().required(),
  },
  stage: {
    value: values.stage || null,
    validation: yup?.string().nullable().required(),
  },
  code: {
    value: values.address?.code ?? '',
    validation: yup?.string().matches('^[0-9]{2}-[0-9]{3}', 'Invalid post code (xx-xxx)').required(),
  },
  city: {
    value: values.address?.city ?? '',
    validation: yup?.string().required(),
  },
  street: {
    value: values.address?.street ?? '',
    validation: yup?.string().required(),
  },
  lat: {
    value: values.address?.lat ?? '',
    validation: yup?.string().required(),
  },
  lng: {
    value: values.address?.lng ?? '',
    validation: yup?.string().required(),
  },
  house: {
    value: values.address?.house ?? '',
    validation: yup?.string().required(),
  },
  flat: {
    value: values.address?.flat ?? '',
    validation: yup?.string(),
  },
  assignedEmployee: {
    value: values.assignedEmployee?._id || null,
  },
  startDate: {
    value: values.startDate,
  },
  endDate: {
    value: values.endDate,
  },
  employeeMessage: {
    value: values.employeeMessage || '',
    validation: yup?.string(),
  },
  managerMessage: {
    value: values.managerMessage || '',
    validation: yup?.string(),
  },
  files: {
    value: values.files || [],
  },
  priority: {
    value: values.priority || 1,
  },
});
