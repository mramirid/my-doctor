import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import GetStartedStack from './GetStartedStack';

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <GetStartedStack />
  </NavigationContainer>
);

export default AppNavigator;
