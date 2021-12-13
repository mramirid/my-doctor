import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../../types/user';
import { signIn, signUpDoctor, signUpPatient, updateProfile, uploadPhoto } from '../thunks/auth';
import { RootState } from '../types';

const initialState: AuthState = {
  uid: null,
  fullName: null,
  occupation: null,
  email: null,
  photo: null,
  isDoctor: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpPatient.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
      })
      .addCase(signUpDoctor.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
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

export const selectUserAuth = ({ auth }: RootState) => auth;
export const selectHasPhoto = ({ auth }: RootState) => auth.photo;
export const selectIsAuth = ({ auth }: RootState) => {
  return !!auth.uid && !!auth.fullName && !!auth.occupation && !!auth.email;
};

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
