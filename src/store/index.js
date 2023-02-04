import { createStore } from 'redux';

import { reducers } from './reducers';

const initialStore = {
  orders: [],
  order: null,
  notifications: [],
  employees: [],
  visibleDrawers: [],
  visibleModals: [],
};

const reducer = (state = initialStore, action) => {
  if (!Object.keys(reducers).includes(action.type)) {
    return state;
  }

  return reducers[action.type](state, action);
};

export const store = createStore(reducer);

export * from './actions';
export * from './selectors';
