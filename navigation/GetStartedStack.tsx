import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { GetStartedStackParamList } from '../global-types/navigation';
import GetStartedScreen from '../screens/GetStartedScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/sign-up/SignUpScreen';
import UploadPhotoScreen from '../screens/auth/sign-up/UploadPhotoScreen';
import { defaultStackScreenOptions } from './constants';

const Stack = createStackNavigator<GetStartedStackParamList>();

const GetStartedStack: React.FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="UploadPhotoScreen" component={UploadPhotoScreen} />
  </Stack.Navigator>
);

export default GetStartedStack;
