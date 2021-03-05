import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import * as React from 'react';

import Colors from '../constants/colors';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const appTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.White,
  },
};

const AppNavigator: React.FC = () => {
  const isAuth = React.useRef(true);
  return (
    <NavigationContainer theme={appTheme}>
      {isAuth.current ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;