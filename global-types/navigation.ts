import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { DoctorSpecialist } from '../constants/user';
import { Doctor, Patient } from './user';

/* ---------------- App Stack ---------------- */

export type AppStackParamList = {
  StartupScreen: undefined;
  GetStartedScreen: undefined;
  SignInScreen: undefined;
  PatientSignUpScreen: undefined;
  DoctorSignUpScreen: undefined;
  UploadPhotoScreen: undefined;
  HomeTab: undefined;
  CategoryDoctorsScreen: { category: DoctorSpecialist };
  ChatRoomScreen: { partner: Patient | Doctor };
  UserProfileScreen: undefined;
  EditPatientScreen: undefined;
  EditDoctorScreen: undefined;
  DoctorDetailScreen: { doctor: Doctor };
};

export type StartupScreenNavProp = StackNavigationProp<AppStackParamList, 'GetStartedScreen'>;

export type GetStartedScreenNavProp = StackNavigationProp<AppStackParamList, 'GetStartedScreen'>;

export type PatientSignUpScreenNavProp = StackNavigationProp<
  AppStackParamList,
  'PatientSignUpScreen'
>;

export type DoctorSignUpScreenNavProp = StackNavigationProp<
  AppStackParamList,
  'DoctorSignUpScreen'
>;

export type SignInScreenNavProp = StackNavigationProp<AppStackParamList, 'SignInScreen'>;

export type UploadPhotoScreenNavProp = StackNavigationProp<AppStackParamList, 'UploadPhotoScreen'>;

export type CategoryDoctorsScreenRouteProp = RouteProp<AppStackParamList, 'CategoryDoctorsScreen'>;
export type CategoryDoctorsScreenNavProp = StackNavigationProp<
  AppStackParamList,
  'CategoryDoctorsScreen'
>;

export type ChatRoomScreenRouteProp = RouteProp<AppStackParamList, 'ChatRoomScreen'>;

export type UserProfileScreenNavProp = StackNavigationProp<AppStackParamList, 'UserProfileScreen'>;

export type DoctorDetailScreenRouteProp = RouteProp<AppStackParamList, 'DoctorDetailScreen'>;
export type DoctorDetailScreenNavProp = StackNavigationProp<
  AppStackParamList,
  'DoctorDetailScreen'
>;

export type EditPatientScreenNavProp = StackNavigationProp<AppStackParamList, 'EditPatientScreen'>;

export type EditDoctorScreenNavProp = StackNavigationProp<AppStackParamList, 'EditDoctorScreen'>;

/* ---------------- Home Bottom Tabs ---------------- */

export type HomeTabParamList = {
  PatientHomeScreen: undefined;
  DoctorHomeScreen: undefined;
  MessagesScreen: undefined;
  HospitalsScreen: undefined;
};

export type PatientHomeScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabParamList, 'PatientHomeScreen'>,
  StackNavigationProp<AppStackParamList>
>;

export type DoctorHomeScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabParamList, 'DoctorHomeScreen'>,
  StackNavigationProp<AppStackParamList>
>;

export type MessagesScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabParamList, 'MessagesScreen'>,
  StackNavigationProp<AppStackParamList>
>;
