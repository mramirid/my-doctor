import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { useEffect } from 'react';

import fireApp from '../config/firebase';
import { AppStackParamList } from '../navigation/AppStack';
import { selectIsAuth } from '../store/reducers/auth';
import { useAppDispatch, useAppSelector } from '../store/types';

type StartupScreenNavProp = StackNavigationProp<AppStackParamList, 'GetStartedScreen'>;

export default function StartupScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StartupScreenNavProp>();

  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    return fireApp.auth().onAuthStateChanged((user) => {
      if (user && isAuth) {
        navigation.replace('HomeTab');
      } else {
        navigation.replace('GetStartedScreen');
      }
    });
  }, [dispatch, isAuth, navigation]);

  return <AppLoading />;
}
