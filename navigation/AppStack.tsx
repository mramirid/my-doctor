import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';

import { AppStackParamList } from '../global-types/navigation';
import CategoryDoctorsScreen from '../screens/CategoryDoctorsScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import EditUserProfileScreen from '../screens/EditUserProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import GetStartedScreen from '../screens/auth/GetStartedScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/sign-up/SignUpScreen';
import UploadPhotoScreen from '../screens/auth/sign-up/UploadPhotoScreen';
import HomeTab from './HomeTab';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="UploadPhotoScreen" component={UploadPhotoScreen} />
    <Stack.Screen name="HomeTab" component={HomeTab} />
    <Stack.Screen name="CategoryDoctorsScreen" component={CategoryDoctorsScreen} />
    <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
    <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
    <Stack.Screen name="EditUserProfileScreen" component={EditUserProfileScreen} />
    <Stack.Screen name="DoctorProfileScreen" component={DoctorProfileScreen} />
  </Stack.Navigator>
);

export default AppStack;
