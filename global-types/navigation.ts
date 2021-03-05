import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import DoctorSpecialist from '../constants/doctor-specialist';

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
  HomeBottomTab: undefined;
  ListDoctorsScreen: { category: DoctorSpecialist };
};

export type ListDoctorsScreenRouteProp = RouteProp<HomeStackParamList, 'ListDoctorsScreen'>;
export type ListDoctorsScreenNavProp = StackNavigationProp<HomeStackParamList, 'ListDoctorsScreen'>;

/*
 * Home Bottom Tabs
 */
export type HomeBottomTabParamList = {
  DoctorsOverviewScreen: undefined;
  MessagesScreen: undefined;
  HospitalsScreen: undefined;
};

export type DoctorsOverviewScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabParamList, 'DoctorsOverviewScreen'>,
  StackNavigationProp<HomeStackParamList>
>;
