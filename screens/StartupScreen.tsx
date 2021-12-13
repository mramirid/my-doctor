import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import React, { FC, useEffect } from 'react';

import firebase from '../config/firebase';
import { AppStackParamList } from '../navigation/AppStack';
import { selectIsAuth } from '../store/reducers/auth';
import { useAppDispatch, useAppSelector } from '../store/types';

type StartupScreenNavProp = StackNavigationProp<AppStackParamList, 'GetStartedScreen'>;

const StartupScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StartupScreenNavProp>();

  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user && isAuth) {
        navigation.replace('HomeTab');
      } else {
        navigation.replace('GetStartedScreen');
      }
    });
  }, [dispatch, isAuth, navigation]);

  return <AppLoading />;
};

export default StartupScreen;
