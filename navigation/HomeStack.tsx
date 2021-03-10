import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';

import { HomeStackParamList } from '../global-types/navigation';
import CategoryDoctorsScreen from '../screens/CategoryDoctorsScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import EditUserProfileScreen from '../screens/EditUserProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import HomeTab from './HomeTab';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeTab" component={HomeTab} />
    <Stack.Screen name="CategoryDoctorsScreen" component={CategoryDoctorsScreen} />
    <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
    <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
    <Stack.Screen name="EditUserProfileScreen" component={EditUserProfileScreen} />
    <Stack.Screen name="DoctorProfileScreen" component={DoctorProfileScreen} />
  </Stack.Navigator>
);

export default HomeStack;
