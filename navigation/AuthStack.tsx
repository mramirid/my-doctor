import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';

import { AuthStackParamList } from '../global-types/navigation';
import GetStartedScreen from '../screens/auth/GetStartedScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/sign-up/SignUpScreen';
import UploadPhotoScreen from '../screens/auth/sign-up/UploadPhotoScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="UploadPhotoScreen">
    <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="UploadPhotoScreen" component={UploadPhotoScreen} />
  </Stack.Navigator>
);

export default AuthStack;
