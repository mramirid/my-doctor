import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';

import authReducer from './auth';

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: 'auth',
      version: 1,
      storage: ExpoFileSystemStorage,
    },
    authReducer
  ),
});

export default rootReducer;
