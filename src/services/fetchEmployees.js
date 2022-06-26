import axios from './axios';

import { employeeColors } from '../utils/employeeColors';

export const fetchEmployees = () => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/employees`)
    .then(({ data }) => {
      resolve(data.map((employee, index) => ({
        ...employee,
        color: employeeColors[index],
      })));
    })
    .catch((err) => {
      reject(err);
    });
});
