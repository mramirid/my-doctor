import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import produce from 'immer';
import React, { FC } from 'react';

import Colors from '../constants/colors';
import AppStack from './AppStack';

const appTheme = produce(DefaultTheme, (themeDraft) => {
  themeDraft.colors.background = Colors.White;
});

const AppNavigator: FC = () => (
  <NavigationContainer theme={appTheme}>
    <AppStack />
  </NavigationContainer>
);

export default AppNavigator;
