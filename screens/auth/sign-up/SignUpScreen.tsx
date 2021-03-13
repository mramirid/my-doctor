import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/native';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { FC, useCallback, useContext } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppButton from '../../../components/atoms/AppButton';
import AppGap from '../../../components/atoms/AppGap';
import AppTextInput from '../../../components/atoms/AppTextInput';
import Header from '../../../components/molecules/header/Header';
import Colors from '../../../constants/colors';
import { AppLoadingIndicatorContext } from '../../../contexts/app-loading-indicator';
import { SignUpScreenNavProp } from '../../../global-types/navigation';
import { SignUpFormValues } from '../../../global-types/patient';
import withStatusBar from '../../../hoc/withStatusBar';
import { logout } from '../../../store/reducers/auth';
import { signUp } from '../../../store/thunks/auth';
import { useAppDispatch } from '../../../store/types';

const SignUpScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SignUpScreenNavProp>();
  const { showLoading, hideLoading } = useContext(AppLoadingIndicatorContext);

  const { control, handleSubmit, formState, reset } = useForm<SignUpFormValues>();
  const TypedController = useTypedController<SignUpFormValues>({ control });

  const onSubmit = useCallback<SubmitHandler<SignUpFormValues>>(
    async (data) => {
      try {
        showLoading();
        dispatch(logout());
        unwrapResult(await dispatch(signUp(data)));
        reset();
        navigation.navigate('UploadPhotoScreen');
      } catch (error) {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      } finally {
        hideLoading();
      }
    },
    [dispatch, hideLoading, navigation, reset, showLoading]
  );

  const onValidationError = useCallback<SubmitErrorHandler<SignUpFormValues>>((errors) => {
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
      <Header title="Daftar Akun" type="flat" onBackButtonPressed={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <TypedController
          name="fullName"
          defaultValue=""
          rules={{ required: 'Nama lengkap wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Nama Lengkap"
              autoCapitalize="words"
              returnKeyType="next"
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="occupation"
          defaultValue=""
          rules={{ required: 'Pekerjaan wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Pekerjaan"
              autoCapitalize="words"
              returnKeyType="next"
            />
          )}
        />
        <AppGap height={24} />
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
          rules={{
            required: 'Password wajib diisi',
            minLength: {
              value: 6,
              message: 'Password minimal 6 abjad',
            },
          }}
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
        <AppGap height={40} />
        <AppButton
          title="Continue"
          color="accent"
          disabled={formState.isSubmitting}
          onPress={handleSubmit(onSubmit, onValidationError)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 40,
  },
});

export default withStatusBar(SignUpScreen, 'dark', Colors.White);
