import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { DoctorsStackParamList } from '../global-types/navigation';
import DoctorsOverviewScreen from '../screens/doctors/DoctorsOverviewScreen';
import { defaultStackScreenOptions } from './constants';

const Stack = createStackNavigator<DoctorsStackParamList>();

const DoctorsStack: React.FC = () => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name="DoctorsOverviewScreen" component={DoctorsOverviewScreen} />
    <Stack.Screen name="ListDoctorsScreen" component={DoctorsOverviewScreen} />
  </Stack.Navigator>
);

export default DoctorsStack;
