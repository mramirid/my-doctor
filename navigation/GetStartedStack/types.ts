import { StackNavigationProp } from '@react-navigation/stack';

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
