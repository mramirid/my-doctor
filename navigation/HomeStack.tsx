import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { HomeStackParamList } from '../global-types/navigation';
import CategoryDoctorsScreen from '../screens/CategoryDoctorsScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import HomeTab from './HomeTab';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeTab" component={HomeTab} />
    <Stack.Screen name="CategoryDoctorsScreen" component={CategoryDoctorsScreen} />
    <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
  </Stack.Navigator>
);

export default HomeStack;
