import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import produce from 'immer';

import Colors from '../constants/colors';
import AppStack from './AppStack';

const appTheme = produce(DefaultTheme, (themeDraft) => {
  themeDraft.colors.background = Colors.White;
});

export default function AppNavigator() {
  return (
    <NavigationContainer theme={appTheme}>
      <AppStack />
    </NavigationContainer>
  );
}
