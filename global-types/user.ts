import { DoctorSpecialist, Gender } from '../constants/user';

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

/* ---------------- Patient ---------------- */

export interface PatientSignUpFormValues {
  fullName: string;
  occupation: DoctorSpecialist | string;
  email: string;
  password: string;
}

export interface Patient {
  fullName: string;
  email: string;
  occupation: string;
  photo: string | null;
  isDoctor: false;
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
