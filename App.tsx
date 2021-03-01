import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { enableScreens } from 'react-native-screens';

import Fonts from './constants/fonts';
import GetStartedScreen from './screens/GetStartedScreen';

enableScreens();

const App: React.FC = () => {
  const [isFontsLoaded] = useFonts({
    [Fonts.NunitoBlack]: require('./assets/fonts/Nunito-Black.ttf'),
    [Fonts.NunitoBold]: require('./assets/fonts/Nunito-Bold.ttf'),
    [Fonts.NunitoExtraBold]: require('./assets/fonts/Nunito-ExtraBold.ttf'),
    [Fonts.NunitoExtraLight]: require('./assets/fonts/Nunito-ExtraLight.ttf'),
    [Fonts.NunitoLight]: require('./assets/fonts/Nunito-Light.ttf'),
    [Fonts.NunitoRegular]: require('./assets/fonts/Nunito-Regular.ttf'),
    [Fonts.NunitoSemiBold]: require('./assets/fonts/Nunito-SemiBold.ttf'),
  });

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <GetStartedScreen />
    </>
  );
};

export default App;
