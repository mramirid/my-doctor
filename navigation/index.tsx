import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const AppNavigator: React.FC = () => {
  const isAuth = React.useRef(true);
  return (
    <NavigationContainer>{isAuth.current ? <HomeStack /> : <AuthStack />}</NavigationContainer>
  );
};

export default AppNavigator;
