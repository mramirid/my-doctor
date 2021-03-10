import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import React, { FC, useRef } from 'react';

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

const AppNavigator: FC = () => {
  const isAuth = useRef(true);
  return (
    <NavigationContainer theme={appTheme}>
      {isAuth.current ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
