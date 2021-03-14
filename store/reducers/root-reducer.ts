import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';

import authReducer from './auth';
import userMode from './user-mode';

const rootReducer = combineReducers({
  userMode: persistReducer(
    {
      key: 'userMode',
      version: 1,
      storage: AsyncStorage,
    },
    userMode
  ),
  auth: persistReducer(
    {
      key: 'auth',
      version: 3,
      storage: ExpoFileSystemStorage,
    },
    authReducer
  ),
});

export default rootReducer;
