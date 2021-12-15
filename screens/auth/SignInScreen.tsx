import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { unwrapResult } from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import React, { useContext } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppLogo from '../../assets/icons/AppLogo';
import AppButton from '../../components/atoms/AppButton';
import AppGap from '../../components/atoms/AppGap';
import AppLink from '../../components/atoms/AppLink';
import AppTextInput from '../../components/atoms/AppTextInput';
import Colors from '../../constants/colors';
import { AppLoadingIndicatorContext } from '../../contexts/app-loading-indicator';
import withStatusBar from '../../hoc/withStatusBar';
import { AppStackParamList } from '../../navigation/AppStack';
import { selectSignInAsDoctor } from '../../store/reducers/user-mode';
import { signIn } from '../../store/thunks/auth';
import { useAppDispatch, useAppSelector } from '../../store/types';
import { SignInFormValues } from '../../types/user';

type SignInScreenNavProp = StackNavigationProp<AppStackParamList, 'SignInScreen'>;

function SignInScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SignInScreenNavProp>();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);

  const signInAsDoctor = useAppSelector(selectSignInAsDoctor);
  const { control, handleSubmit, formState, reset } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const TypedController = useTypedController<SignInFormValues>({ control });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      showScreenLoading();
      unwrapResult(await dispatch(signIn(data)));
      reset();
      navigation.popToTop();
      navigation.replace('HomeTab');
    } catch (error: any) {
      showMessage({
        message: error.message,
        type: 'danger',
        statusBarHeight: Constants.statusBarHeight,
      });
    } finally {
      hideScreenLoading();
    }
  };

  const onValidationError = (errors: DeepMap<SignInFormValues, FieldError>) => {
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        showMessage({
          message: (errors as any)[field].message,
          type: 'danger',
          statusBarHeight: Constants.statusBarHeight,
        });
        break;
      }
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      showsVerticalScrollIndicator={false}>
      <AppLogo color={signInAsDoctor ? Colors.Red : Colors.Green3} />
      <Text style={styles.title}>
        {signInAsDoctor ? 'Masuk sebagai dokter' : 'Masuk dan mulai berkonsultasi'}
      </Text>
      <TypedController
        name="email"
        rules={{
          required: 'Email wajib diisi',
          pattern: {
            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Email tidak valid',
          },
        }}
        render={(renderProps) => (
          <AppTextInput
            {...renderProps}
            onChangeText={(text) => renderProps.onChange(text)}
            label="Email Address"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      <AppGap height={24} />
      <TypedController
        name="password"
        rules={{ required: 'Password wajib diisi' }}
        render={(renderProps) => (
          <AppTextInput
            {...renderProps}
            onChangeText={(text) => renderProps.onChange(text)}
            label="Password"
            secureTextEntry
            autoCapitalize="none"
          />
        )}
      />
      <AppGap height={10} />
      <AppLink onPress={() => null}>Forgot My Password</AppLink>
      <AppButton
        style={styles.signInButton}
        title="Sign In"
        color="accent"
        disabled={formState.isSubmitting}
        onPress={handleSubmit(onSubmit, onValidationError)}
      />
      <AppLink
        style={styles.signUpLink}
        onPress={() => {
          navigation.navigate(signInAsDoctor ? 'DoctorSignUpScreen' : 'PatientSignUpScreen');
        }}>
        Create New Account
      </AppLink>
      <AppGap height={64} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContent: {
    paddingTop: 40,
    paddingHorizontal: 40,
  },
  title: {
    marginVertical: 40,
    maxWidth: 155,
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    color: Colors.Dark,
  },
  signInButton: {
    marginTop: 40,
    marginBottom: 30,
  },
  signUpLink: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default withStatusBar(SignInScreen, 'dark', Colors.White);
