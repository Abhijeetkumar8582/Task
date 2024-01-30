import { configureStore } from '@reduxjs/toolkit';
import reducer from './Reducer/index.js';

const store = configureStore({
  reducer: reducer
});

export default store;

