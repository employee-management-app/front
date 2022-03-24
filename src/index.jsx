import React from 'react';
import { render } from 'react-dom';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './styles/global.scss';

const root = document.getElementById('root');

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root,
);

serviceWorkerRegistration.register();
