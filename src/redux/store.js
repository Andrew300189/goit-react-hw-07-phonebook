import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

const customMiddleware = (store) => (next) => (action) => {
  console.log('Action:', action);
  const result = next(action);
  console.log('State after dispatch:', store.getState());

  return result;
};

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});

export default store;