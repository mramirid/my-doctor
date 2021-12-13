import { Action, SerializedError, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { store } from '.';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppThunkAPIConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: unknown;
  rejectValue: { message: string };
  serializedErrorType: SerializedError;
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
