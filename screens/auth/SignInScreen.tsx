import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/core';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { FC, useCallback } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppLogo from '../../assets/icons/AppLogo';
import AppButton from '../../components/atoms/AppButton';
import AppGap from '../../components/atoms/AppGap';
import AppLink from '../../components/atoms/AppLink';
import AppTextInput from '../../components/atoms/AppTextInput';
import AppLoadingIndicator from '../../components/molecules/AppLoadingIndicator';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { SignInScreenNavProp } from '../../global-types/navigation';
import { SignInFormValues } from '../../global-types/patient';
import withStatusBar from '../../hoc/withStatusBar';
import { logout } from '../../store/reducers/auth';
import { signIn } from '../../store/thunks/auth';
import { useAppDispatch } from '../../store/types';

const SignInScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SignInScreenNavProp>();

  const { control, handleSubmit, reset, formState } = useForm<SignInFormValues>();
  const TypedController = useTypedController<SignInFormValues>({ control });

  const onSubmit = useCallback<SubmitHandler<SignInFormValues>>(
    async (data) => {
      try {
        dispatch(logout());
        unwrapResult(await dispatch(signIn(data)));
        reset();
        navigation.replace('HomeTab');
      } catch (error) {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      }
    },
    [dispatch, navigation, reset]
  );

  const onValidationError = useCallback<SubmitErrorHandler<SignInFormValues>>((errors) => {
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        showMessage({
          message: (errors as any)[field].message,
          type: 'danger',
        });
        break;
      }
    }
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
        <AppLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <TypedController
          name="email"
          defaultValue=""
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
              returnKeyType="next"
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="password"
          defaultValue=""
          rules={{ required: 'Password wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Password"
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
            />
          )}
        />
        <AppGap height={10} />
        <AppLink onPress={() => null}>Forgot My Password</AppLink>
        <AppButton
          style={styles.signInButton}
          title="Sign In"
          color="accent"
          onPress={handleSubmit(onSubmit, onValidationError)}
        />
        <AppLink style={styles.signUpLink} onPress={() => navigation.navigate('SignUpScreen')}>
          Create New Account
        </AppLink>
        <AppGap height={64} />
      </ScrollView>
      {formState.isSubmitting && <AppLoadingIndicator />}
    </View>
  );
};

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
    fontFamily: Fonts.NunitoSemiBold,
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
