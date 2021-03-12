import { createSlice } from '@reduxjs/toolkit';

import Patient from '../../global-types/patient';
import { signIn, signUp, updateProfile, uploadPhoto } from '../thunks/auth';
import { RootState } from '../types';

const initialState: Patient = {
  uid: null,
  email: null,
  fullName: null,
  occupation: null,
  photo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.uid = null;
      state.fullName = null;
      state.occupation = null;
      state.email = null;
      state.photo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.uid = payload.uid;
        state.email = payload.email;
        state.fullName = payload.fullName;
        state.occupation = payload.occupation;
        state.photo = payload.photo;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.uid = payload.uid;
        state.fullName = payload.fullName;
        state.occupation = payload.occupation;
        state.email = payload.email;
        state.photo = payload.photo;
      })
      .addCase(uploadPhoto.fulfilled, (state, { payload }) => {
        state.photo = payload.newPhoto;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.fullName = payload.fullName;
        state.occupation = payload.occupation;
        state.photo = payload.photo;
      });
  },
});

export const selectUserAuth = (state: RootState) => state.auth;
export const selectHasPhoto = (state: RootState) => state.auth.photo;
export const selectIsAuth = ({ auth }: RootState) => {
  return !!auth.uid && !!auth.fullName && !!auth.occupation && !!auth.email;
};

export const { logout } = authSlice.actions;

export default authSlice.reducer;
