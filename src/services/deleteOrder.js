import axios from 'axios';

export const deleteOrder = (order) => new Promise((resolve, reject) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/order-delete/${order.id}`)
    .then(({ data }) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});
