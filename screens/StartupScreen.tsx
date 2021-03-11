import { useNavigation } from '@react-navigation/core';
import AppLoading from 'expo-app-loading';
import React, { FC, useEffect } from 'react';

import firebase from '../config/firebase';
import { StartupScreenNavProp } from '../global-types/navigation';
import { useAppDispatch } from '../store/types';

const StartupScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StartupScreenNavProp>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('HomeTab');
      } else {
        navigation.replace('GetStartedScreen');
      }
    });
  }, [dispatch, navigation]);

  return <AppLoading />;
};

export default StartupScreen;
