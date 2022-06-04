import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';
import { useNotification } from './hooks/useNotification';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './styles/global.scss';

const ServiceWorkerWrapper = ({ children }) => {
  const { pushNotification } = useNotification();

  const reloadPage = (registration) => {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  };

  const onServiceWorkerUpdate = (registration) => {
    pushNotification({ 
      theme: 'info', 
      content: 'New version is available!', 
      action: {
        label: 'Get the new version',
        onClick: () => reloadPage(registration),
      },
      manualClose: true, 
    });
  };

  React.useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onServiceWorkerUpdate });
  }, []);

  return children;
};

const root = document.getElementById('root');

render(
  <Provider store={store}>
    <ServiceWorkerWrapper>
      <App />
    </ServiceWorkerWrapper>
  </Provider>,
  root,
);
