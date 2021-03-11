import { createAsyncThunk } from '@reduxjs/toolkit';

import firebase from '../../config/firebase';
import Patient, {
  PickedPhoto,
  SignInFormValues,
  SignUpFormValues,
} from '../../global-types/patient';
import { AppThunkAPIConfig } from '../types';

interface FirePatient {
  fullName: string;
  email: string;
  occupation: string;
  photo: string | null;
}

export const signUp = createAsyncThunk<Patient, SignUpFormValues, AppThunkAPIConfig>(
  'auth/signUp',
  async (payload, thunkAPI) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);

      const user = userCredential.user;
      const createdPatient: FirePatient = {
        fullName: payload.fullName,
        email: payload.email,
        occupation: payload.occupation,
        photo: null,
      };
      await firebase.database().ref(`users/${user!.uid}`).set(createdPatient);
      return {
        uid: user!.uid,
        ...createdPatient,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.message || 'Terjadi kesalahan, coba lagi nanti',
      });
    }
  }
);

interface UploadPhotoReturned {
  newPhoto: string;
}

export const uploadPhoto = createAsyncThunk<UploadPhotoReturned, PickedPhoto, AppThunkAPIConfig>(
  'auth/uploadPhoto',
  async (payload, thunkAPI) => {
    try {
      const patientUid = thunkAPI.getState().auth.uid;
      const photo = `data:image;base64, ${payload.base64}`;
      await firebase.database().ref(`users/${patientUid}`).update({ photo });
      return {
        newPhoto: photo,
      };
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

export const signIn = createAsyncThunk<Patient, SignInFormValues, AppThunkAPIConfig>(
  'auth/signIn',
  async (payload, thunkAPI) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);

      const user = userCredential.user;
      const fetchedPatient = await new Promise<FirePatient>((resolve, reject) => {
        firebase
          .database()
          .ref(`users/${user!.uid}`)
          .once(
            'value',
            (data) => {
              resolve(data.val());
            },
            (error) => reject(error)
          );
      });

      return {
        uid: user!.uid,
        ...fetchedPatient,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.message || 'Terjadi kesalahan, coba lagi nanti',
      });
    }
  }
);
