import { StackNavigationProp } from '@react-navigation/stack';

/*
 * Doctors Stack Navigation
 */
export type DoctorsStackParamList = {
  DoctorsOverviewScreen: undefined;
  ListDoctorsScreen: undefined;
};

/*
 * "Get Started" Stack Navigation
 */
export type GetStartedStackParamList = {
  GetStartedScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  UploadPhotoScreen: undefined;
};

export type GettingStartedScreenNavProp = StackNavigationProp<
  GetStartedStackParamList,
  'GetStartedScreen'
>;

export type SignUpScreenNavProp = StackNavigationProp<GetStartedStackParamList, 'SignUpScreen'>;

/*
 * Homepage Bottom Tabs Navigation
 */
export type HomepageBottomTabsParamList = {
  DoctorsStack: undefined;
  MessagesStack: undefined;
  HospitalsScreen: undefined;
};
