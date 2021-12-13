import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import React from 'react';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Fonts from './constants/fonts';
import { AppLoadingIndicatorContextProvider } from './contexts/app-loading-indicator';
import AppNavigator from './navigation';
import { persistor, store } from './store';

enableScreens();

LogBox.ignoreLogs(['https://github.com/facebook/react-native/issues/12981']);

export default function App() {
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
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <AppLoadingIndicatorContextProvider>
            <AppNavigator />
          </AppLoadingIndicatorContextProvider>
        </PersistGate>
      </Provider>
      <FlashMessage position="top" />
    </>
  );
}
