import { Merge, ReadonlyDeep } from 'type-fest';

import { DoctorSpecialist, Gender } from '../constants/user';

/* ---------------- Generic User ---------------- */

export type SignInFormValues = Readonly<{
  email: string;
  password: string;
}>;

export type AuthState = Readonly<{
  uid: string | null;
  fullName: string | null;
  occupation: string | null;
  email: string | null;
  photo: string | null;
  isDoctor: boolean;
}>;

/* ---------------- Patient ---------------- */

export type PatientSignUpFormValues = Merge<
  SignInFormValues,
  Readonly<{
    fullName: string;
    occupation: string;
  }>
>;

export type PatientData = Merge<
  Omit<PatientSignUpFormValues, 'password'>,
  Readonly<{
    photo: string | null;
    isDoctor: false;
  }>
>;

export type Patient = PatientData & { readonly uid: string };

/* ---------------- Doctor ---------------- */

export type DoctorSignUpFormValues = Merge<
  SignInFormValues,
  Readonly<{
    fullName: string;
    occupation: DoctorSpecialist;
    almamater: string;
    credentialId: string;
    workplace: string;
    gender: Gender;
  }>
>;

export type DoctorData = Merge<
  Omit<DoctorSignUpFormValues, 'password'>,
  Readonly<{
    photo: string | null;
    isDoctor: true;
    rating: number;
  }>
>;

export type Doctors = ReadonlyDeep<{
  [id: string]: DoctorData;
}>;

export type Doctor = DoctorData & { readonly uid: string };
