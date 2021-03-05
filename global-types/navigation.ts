import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import DoctorSpecialist from '../constants/doctor-specialist';
import Doctor from './doctor';

/*
 * Auth Stack
 */
export type AuthStackParamList = {
  GetStartedScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  UploadPhotoScreen: undefined;
};

export type GettingStartedScreenNavProp = StackNavigationProp<
  AuthStackParamList,
  'GetStartedScreen'
>;

export type SignUpScreenNavProp = StackNavigationProp<AuthStackParamList, 'SignUpScreen'>;

/*
 * Home Stack
 */
export type HomeStackParamList = {
  HomeTab: undefined;
  CategoryDoctorsScreen: { category: DoctorSpecialist };
  ChatRoomScreen: { doctor: Doctor };
};

export type CategoryDoctorsScreenRouteProp = RouteProp<HomeStackParamList, 'CategoryDoctorsScreen'>;
export type CategoryDoctorsScreenNavProp = StackNavigationProp<
  HomeStackParamList,
  'CategoryDoctorsScreen'
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
  StackNavigationProp<HomeStackParamList>
>;
