import { createAsyncThunk } from '@reduxjs/toolkit';

import firebase from '../../config/firebase';
import {
  AuthState,
  DoctorSignUpFormValues,
  FireDoctor,
  PatientSignUpFormValues,
  SignInFormValues,
} from '../../global-types/user';
import { AppThunkAPIConfig } from '../types';

export const signUpPatient = createAsyncThunk<
  AuthState,
  PatientSignUpFormValues,
  AppThunkAPIConfig
>('auth/signUpPatient', async (payload, thunkAPI) => {
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password);

    const user = userCredential.user;
    await firebase.database().ref(`users/${user!.uid}`).set({
      email: payload.email,
      fullName: payload.fullName,
      occupation: payload.occupation,
      isDoctor: false,
    });

    return {
      uid: user!.uid,
      fullName: payload.fullName,
      email: payload.email,
      occupation: payload.occupation,
      photo: null,
      isDoctor: false,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue({
      message: err.message || 'Terjadi kesalahan, coba lagi nanti',
    });
  }
});

export const signUpDoctor = createAsyncThunk<AuthState, DoctorSignUpFormValues, AppThunkAPIConfig>(
  'auth/signUpDoctor',
  async (payload, thunkAPI) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);

      const user = userCredential.user;
      const createdDoctor: FireDoctor = {
        fullName: payload.fullName,
        occupation: payload.occupation,
        almamater: payload.almamater,
        credentialId: payload.credentialId,
        gender: payload.gender,
        email: payload.email,
        workplace: payload.workplace,
        rating: 0,
        isDoctor: true,
      };
      await firebase.database().ref(`users/${user!.uid}`).set(createdDoctor);

      return {
        uid: user!.uid,
        fullName: createdDoctor.fullName,
        email: createdDoctor.email,
        occupation: createdDoctor.occupation,
        photo: null,
        isDoctor: true,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.message || 'Terjadi kesalahan, coba lagi nanti',
      });
    }
  }
);

interface UploadPhotoPayload {
  newPhoto: string;
}

export const uploadPhoto = createAsyncThunk<
  UploadPhotoPayload,
  UploadPhotoPayload,
  AppThunkAPIConfig
>(
  'auth/uploadPhoto',
  async (payload, thunkAPI) => {
    try {
      const userUID = thunkAPI.getState().auth.uid;
      await firebase.database().ref(`users/${userUID}`).update({ photo: payload.newPhoto });
      return { newPhoto: payload.newPhoto };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.message || 'Terjadi kesalahan, coba lagi nanti',
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

interface SignInResponse {
  fullName: string;
  email: string;
  occupation: string;
  password: string;
  isDoctor: boolean;
  photo?: string;
}

export const signIn = createAsyncThunk<AuthState, SignInFormValues, AppThunkAPIConfig>(
  'auth/signIn',
  async (payload, thunkAPI) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);

      const user = userCredential.user;
      const fetchedUser = await new Promise<SignInResponse>((resolve, reject) => {
        firebase
          .database()
          .ref(`users/${user!.uid}`)
          .once('value', (data) => resolve(data.val()), reject);
      });

      const { signInAsDoctor } = thunkAPI.getState().userMode;
      if (signInAsDoctor && !fetchedUser.isDoctor) {
        firebase.auth().signOut();
        return thunkAPI.rejectWithValue({
          message: 'Anda bukan seorang dokter. Silahkan masuk menggunakan mode pasien',
        });
      }
      if (!signInAsDoctor && fetchedUser.isDoctor) {
        firebase.auth().signOut();
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
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.message || 'Terjadi kesalahan, coba lagi nanti',
      });
    }
  }
);

interface UpdateProfilePayload {
  fullName: string;
  occupation: string;
  photo: string | null;
}

export const updateProfile = createAsyncThunk<
  UpdateProfilePayload,
  UpdateProfilePayload,
  AppThunkAPIConfig
>(
  'auth/updateProfile',
  async (payload, thunkAPI) => {
    try {
      const userUID = thunkAPI.getState().auth.uid;
      await firebase
        .database()
        .ref(`users/${userUID}`)
        .update({ ...payload });
      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.message || 'Terjadi kesalahan, coba lagi nanti',
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
