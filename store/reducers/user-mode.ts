import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../types';

const initialState = {
  signInAsDoctor: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleUserMode(state) {
      state.signInAsDoctor = !state.signInAsDoctor;
    },
  },
});

export const selectSignInAsDoctor = ({ userMode }: RootState) => userMode.signInAsDoctor;

export const { toggleUserMode } = authSlice.actions;

export default authSlice.reducer;
