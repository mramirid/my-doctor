import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import DoctorsOverviewScreen from '../../screens/doctors/DoctorsOverviewScreen';
import { defaultStackScreenOptions } from '../constants';
import { DoctorsStackParamList } from './types';

const Stack = createStackNavigator<DoctorsStackParamList>();

const DoctorsStack: React.FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="DoctorsOverviewScreen" component={DoctorsOverviewScreen} />
    <Stack.Screen name="ListDoctorsScreen" component={DoctorsOverviewScreen} />
  </Stack.Navigator>
);

export default DoctorsStack;
