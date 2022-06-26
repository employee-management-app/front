import axios from 'axios';

export const updateOrder = (id, fields) => new Promise((resolve, reject) => {
  axios.patch(`${process.env.REACT_APP_API_URL}/order/${id}`, fields, { withCredentials: true })
    .then(({ data }) => { resolve(data) })
    .catch((err) => { reject(err) });
});
