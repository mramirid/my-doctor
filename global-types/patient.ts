export interface SignUpFormValues {
  fullName: string;
  occupation: string;
  email: string;
  password: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}

export default interface Patient {
  uid: string | null;
  fullName: string | null;
  email: string | null;
  occupation: string | null;
  photo: string | null;
}
