import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';

import { AppStackParamList } from '../global-types/navigation';
import CategoryDoctorsScreen from '../screens/CategoryDoctorsScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import DoctorDetailScreen from '../screens/DoctorDetailScreen';
import EditDoctorScreen from '../screens/EditDoctorScreen';
import EditPatientScreen from '../screens/EditPatientScreen';
import StartupScreen from '../screens/StartupScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import GetStartedScreen from '../screens/auth/GetStartedScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import DoctorSignUpScreen from '../screens/auth/sign-up/DoctorSignUpScreen';
import PatientSignUpScreen from '../screens/auth/sign-up/PatientSignUpScreen';
import UploadPhotoScreen from '../screens/auth/sign-up/UploadPhotoScreen';
import HomeTab from './HomeTab';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StartupScreen" component={StartupScreen} />
    <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="PatientSignUpScreen" component={PatientSignUpScreen} />
    <Stack.Screen name="DoctorSignUpScreen" component={DoctorSignUpScreen} />
    <Stack.Screen name="UploadPhotoScreen" component={UploadPhotoScreen} />
    <Stack.Screen name="HomeTab" component={HomeTab} />
    <Stack.Screen name="CategoryDoctorsScreen" component={CategoryDoctorsScreen} />
    <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
    <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
    <Stack.Screen name="EditPatientScreen" component={EditPatientScreen} />
    <Stack.Screen name="EditDoctorScreen" component={EditDoctorScreen} />
    <Stack.Screen name="DoctorDetailScreen" component={DoctorDetailScreen} />
  </Stack.Navigator>
);

export default AppStack;
