import axios from 'axios';

const getAuthHeader = () => {
  const { token } = JSON.parse(window.localStorage.getItem('auth')) || {};

  if (!token) {
    return {};
  }

  return {
    'Authorization': `Token ${token}`,
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
}

export default methods;
