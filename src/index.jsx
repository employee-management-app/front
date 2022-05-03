import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './styles/global.scss';

const root = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  root,
);

serviceWorkerRegistration.register();
