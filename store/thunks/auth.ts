import { createAsyncThunk } from '@reduxjs/toolkit';

import firebase from '../../config/firebase';
import Patient, { PickedPhoto, SignUpFormValues } from '../../global-types/patient';
import { AppThunkAPIConfig } from '../types';

interface CreatedPatient {
  fullName: string;
  email: string;
  occupation: string;
}

export const signUp = createAsyncThunk<Patient, SignUpFormValues, AppThunkAPIConfig>(
  'auth/signUp',
  async (payload, thunkAPI) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);

      const patient = userCredential.user;
      const createdPatient: CreatedPatient = {
        fullName: payload.fullName,
        email: payload.email,
        occupation: payload.occupation,
      };
      await firebase.database().ref(`users/${patient!.uid}`).set(createdPatient);
      return {
        uid: patient!.uid,
        ...createdPatient,
        photo: null,
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
