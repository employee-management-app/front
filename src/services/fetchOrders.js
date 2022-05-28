import axios from 'axios';

import { sanitazeOrder } from './helpers/sanitazeOrder';

export const fetchOrders = () => new Promise((resolve, reject) => {

  axios.get(`${process.env.REACT_APP_API_URL}/orders`)
    .then(({ data }) => {
      resolve(data.map((order) => sanitazeOrder(order)));
    })
    .catch((err) => {
      reject(err);
    });
});
