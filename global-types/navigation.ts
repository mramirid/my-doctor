import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import DoctorSpecialist from '../constants/doctor-specialist';
import Doctor from './doctor';

/*
 * App Stack
 */
export type AppStackParamList = {
  StartupScreen: undefined;
  GetStartedScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  UploadPhotoScreen: undefined;
  HomeTab: undefined;
  CategoryDoctorsScreen: { category: DoctorSpecialist };
  ChatRoomScreen: { doctor: Doctor };
  UserProfileScreen: undefined;
  EditUserProfileScreen: undefined;
  DoctorProfileScreen: { doctor: Doctor };
};

export type StartupScreenNavProp = StackNavigationProp<AppStackParamList, 'GetStartedScreen'>;

export type GetStartedScreenNavProp = StackNavigationProp<AppStackParamList, 'GetStartedScreen'>;

export type SignUpScreenNavProp = StackNavigationProp<AppStackParamList, 'SignUpScreen'>;

export type SignInScreenNavProp = StackNavigationProp<AppStackParamList, 'SignInScreen'>;

export type UploadPhotoScreenNavProp = StackNavigationProp<AppStackParamList, 'UploadPhotoScreen'>;

export type CategoryDoctorsScreenRouteProp = RouteProp<AppStackParamList, 'CategoryDoctorsScreen'>;
export type CategoryDoctorsScreenNavProp = StackNavigationProp<
  AppStackParamList,
  'CategoryDoctorsScreen'
>;

export type ChatRoomScreenRouteProp = RouteProp<AppStackParamList, 'ChatRoomScreen'>;

export type UserProfileScreenNavProp = StackNavigationProp<AppStackParamList, 'UserProfileScreen'>;

export type DoctorProfileScreenRouteProp = RouteProp<AppStackParamList, 'DoctorProfileScreen'>;
export type DoctorProfileScreenNavProp = StackNavigationProp<
  AppStackParamList,
  'DoctorProfileScreen'
>;

export type EditUserProfileScreenNavProp = StackNavigationProp<
  AppStackParamList,
  'EditUserProfileScreen'
>;

/*
 * Home Bottom Tabs
 */
export type HomeTabParamList = {
  DoctorsOverviewScreen: undefined;
  MessagesScreen: undefined;
  HospitalsScreen: undefined;
};

export type DoctorsOverviewScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabParamList, 'DoctorsOverviewScreen'>,
  StackNavigationProp<AppStackParamList>
>;

export type MessagesScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabParamList, 'MessagesScreen'>,
  StackNavigationProp<AppStackParamList>
>;
