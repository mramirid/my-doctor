import { createAsyncThunk } from '@reduxjs/toolkit';

import fireApp from '../../config/firebase';
import {
  AuthState,
  DoctorSignUpFormValues,
  DoctorData,
  PatientData,
  PatientSignUpFormValues,
  SignInFormValues,
} from '../../types/user';
import { AppThunkAPIConfig } from '../types';

export const signUpPatient = createAsyncThunk<
  AuthState,
  PatientSignUpFormValues,
  AppThunkAPIConfig
>('auth/signUpPatient', async (payload, thunkAPI) => {
  try {
    const userCredential = await fireApp
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password);

    const user = userCredential.user;
    const createdPatient: PatientData = {
      fullName: payload.fullName,
      occupation: payload.occupation,
      email: payload.email,
      photo: null,
      isDoctor: false,
    };
    await fireApp.database().ref(`users/${user!.uid}`).set(createdPatient);

    return {
      uid: user!.uid,
      ...createdPatient,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message ?? 'Terjadi kesalahan, coba lagi nanti',
    });
  }
});

export const signUpDoctor = createAsyncThunk<AuthState, DoctorSignUpFormValues, AppThunkAPIConfig>(
  'auth/signUpDoctor',
  async (payload, thunkAPI) => {
    try {
      const userCredential = await fireApp
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);

      const user = userCredential.user;
      const createdDoctor: DoctorData = {
        fullName: payload.fullName,
        occupation: payload.occupation,
        almamater: payload.almamater,
        credentialId: payload.credentialId,
        gender: payload.gender,
        email: payload.email,
        workplace: payload.workplace,
        rating: 0,
        isDoctor: true,
        photo: null,
      };
      await fireApp.database().ref(`users/${user!.uid}`).set(createdDoctor);

      return {
        uid: user!.uid,
        fullName: createdDoctor.fullName,
        email: createdDoctor.email,
        occupation: createdDoctor.occupation,
        photo: null,
        isDoctor: true,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message ?? 'Terjadi kesalahan, coba lagi nanti',
      });
    }
  }
);

type UploadPhotoPayload = {
  readonly newPhoto: string;
};

export const uploadPhoto = createAsyncThunk<
  UploadPhotoPayload,
  UploadPhotoPayload,
  AppThunkAPIConfig
>(
  'auth/uploadPhoto',
  async (payload, thunkAPI) => {
    try {
      const userUID = thunkAPI.getState().auth.uid;
      await fireApp.database().ref(`users/${userUID}`).update({ photo: payload.newPhoto });
      return { newPhoto: payload.newPhoto };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message ?? 'Terjadi kesalahan, coba lagi nanti',
      });
    }
  },
  {
    condition: (_, thunkAPI) => {
      const { uid } = thunkAPI.getState().auth;
      return !!uid;
    },
  }
);

type SignInResponse = Readonly<{
  fullName: string;
  email: string;
  occupation: string;
  password: string;
  isDoctor: boolean;
  photo?: string;
}>;

export const signIn = createAsyncThunk<AuthState, SignInFormValues, AppThunkAPIConfig>(
  'auth/signIn',
  async (payload, thunkAPI) => {
    try {
      const userCredential = await fireApp
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);

      const user = userCredential.user;
      const fetchedUser = await new Promise<SignInResponse>((resolve, reject) => {
        fireApp
          .database()
          .ref(`users/${user!.uid}`)
          .once('value', (data) => resolve(data.val()), reject);
      });

      const { signInAsDoctor } = thunkAPI.getState().userMode;
      if (signInAsDoctor && !fetchedUser.isDoctor) {
        fireApp.auth().signOut();
        return thunkAPI.rejectWithValue({
          message: 'Anda bukan seorang dokter. Silahkan masuk menggunakan mode pasien',
        });
      }
      if (!signInAsDoctor && fetchedUser.isDoctor) {
        fireApp.auth().signOut();
        return thunkAPI.rejectWithValue({
          message: 'Anda adalah seorang dokter. Silahkan masuk menggunakan mode dokter',
        });
      }

      return {
        uid: user!.uid,
        isDoctor: fetchedUser.isDoctor,
        fullName: fetchedUser.fullName,
        email: fetchedUser.email,
        occupation: fetchedUser.occupation,
        photo: fetchedUser.photo ?? null,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message ?? 'Terjadi kesalahan, coba lagi nanti',
      });
    }
  }
);

type UpdateProfilePayload = Readonly<{
  fullName: string;
  occupation: string;
  photo: string | null;
}>;

export const updateProfile = createAsyncThunk<
  UpdateProfilePayload,
  UpdateProfilePayload,
  AppThunkAPIConfig
>(
  'auth/updateProfile',
  async (payload, thunkAPI) => {
    try {
      const userUID = thunkAPI.getState().auth.uid;
      await fireApp
        .database()
        .ref(`users/${userUID}`)
        .update({ ...payload });
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message ?? 'Terjadi kesalahan, coba lagi nanti',
      });
    }
  },
  {
    condition: (_, thunkAPI) => {
      const { uid } = thunkAPI.getState().auth;
      return !!uid;
    },
  }
);
