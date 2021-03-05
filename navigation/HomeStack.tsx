import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { HomeStackParamList } from '../global-types/navigation';
import ListDoctorsScreen from '../screens/doctors/ListDoctorsScreen';
import HomepageBottomTab from './HomeBottomTabs';
import { defaultStackScreenOptions } from './constants';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="HomeBottomTab" component={HomepageBottomTab} />
    <Stack.Screen name="ListDoctorsScreen" component={ListDoctorsScreen} />
  </Stack.Navigator>
);

export default HomeStack;
