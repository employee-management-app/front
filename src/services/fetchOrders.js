import axios from 'axios';

export const fetchOrders = (params = {}) => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/orders`, { params, withCredentials: true })
    .then(({ data }) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});
