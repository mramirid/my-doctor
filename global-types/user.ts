import { DoctorSpecialist, Gender } from '../constants/user';

/* ---------------- Patient ---------------- */

export interface PatientSignUpFormValues {
  fullName: string;
  occupation: string;
  email: string;
  password: string;
}

export interface FirePatient {
  fullName: string;
  occupation: string;
  email: string;
  photo: string | null;
  isDoctor: false;
}

export interface Patient extends FirePatient {
  uid: string;
}

/* ---------------- Doctor ---------------- */

export interface DoctorSignUpFormValues {
  fullName: string;
  occupation: DoctorSpecialist;
  email: string;
  password: string;
  almamater: string;
  credentialId: string;
  workplace: string;
  gender: Gender;
}

export interface FireDoctor {
  fullName: string;
  occupation: string;
  almamater: string;
  credentialId: string;
  workplace: string;
  gender: Gender;
  email: string;
  photo: string | null;
  isDoctor: true;
  rating: number;
}

export interface FireGetDoctors {
  [id: string]: FireDoctor;
}

export interface Doctor extends FireDoctor {
  uid: string;
}

export interface DoctorCategory {
  id: string;
  name: DoctorSpecialist | string;
}

/* ---------------- Generic User ---------------- */

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface AuthState {
  uid: string | null;
  fullName: string | null;
  occupation: string | null;
  email: string | null;
  photo: string | null;
  isDoctor: boolean;
}
