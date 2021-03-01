import { StackNavigationProp } from '@react-navigation/stack';

export type GetStartedStackParamList = {
  GetStartedScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

export type GetStartedScreenNavProp = StackNavigationProp<
  GetStartedStackParamList,
  'GetStartedScreen'
>;
