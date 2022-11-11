import axios from 'axios';

const getAuthHeader = () => {
  // eslint-disable-next-line max-len
  const { token } = JSON.parse(window.localStorage.getItem('auth')) || { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjg2MThjNjU3NDQyMGRjOTZkYjQ2NyIsImlhdCI6MTY2ODE4NjAzNH0.RHye3YH1BhrZrFmbghKxP4oS5wki2mRtZacAK6XVtO8' };

  if (!token) {
    return {};
  }

  return {
    Authorization: `Token ${token}`,
  };
};

const get = (url, config) => (
  axios.get(url, { ...config, headers: { ...config?.headers, ...getAuthHeader() } })
);

const post = (url, data, config) => (
  axios.post(url, data, { ...config, headers: { ...config?.headers, ...getAuthHeader() } })
);

const patch = (url, data, config) => (
  axios.patch(url, data, { ...config, headers: { ...config?.headers, ...getAuthHeader() } })
);

const _delete = (url, config) => (
  axios.delete(url, { ...config, headers: { ...config?.headers, ...getAuthHeader() } })
);

const methods = {
  get,
  post,
  patch,
  delete: _delete,
};

export default methods;
