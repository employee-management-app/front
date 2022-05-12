import axios from 'axios';

import { sanitazeOrder } from './helpers/sanitazeOrder';

export const fetchEmployeeOrders = (id, params) => new Promise((resolve, reject) => {
  axios.get(`${process.env.REACT_APP_API_URL}/employee/${id}/orders`, { params })
    .then(({ data }) => {
      resolve(
        data.reduce((acc, order) => [...acc, sanitazeOrder(order)], [])
      );
    })
    .catch((err) => {
      reject(err);
    });
});
