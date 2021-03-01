import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import GetStartedScreen from '../../screens/GetStartedScreen';
import SignInScreen from '../../screens/auth/SignInScreen';
import SignUpScreen from '../../screens/auth/SignUpScreen';
import { GetStartedStackParamList } from './types';

const Stack = createStackNavigator<GetStartedStackParamList>();

const GetStartedStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
  </Stack.Navigator>
);

export default GetStartedStack;
