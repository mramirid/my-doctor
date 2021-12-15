import 'react-native-gesture-handler';
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
} from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AppLoadingIndicatorContextProvider } from './contexts/app-loading-indicator';
import AppNavigator from './navigation';
import { persistor, store } from './store';

enableScreens();

LogBox.ignoreLogs(['https://github.com/facebook/react-native/issues/12981']);

export default function App() {
  const [areFontsLoaded] = useFonts({ Nunito_300Light, Nunito_400Regular, Nunito_600SemiBold });

  if (!areFontsLoaded) {
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
