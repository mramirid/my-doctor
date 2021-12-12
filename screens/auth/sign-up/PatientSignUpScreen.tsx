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
import { PatientSignUpScreenNavProp } from '../../../global-types/navigation';
import { PatientSignUpFormValues } from '../../../global-types/user';
import withStatusBar from '../../../hoc/withStatusBar';
import { signUpPatient } from '../../../store/thunks/auth';
import { useAppDispatch } from '../../../store/types';

const SignUpScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<PatientSignUpScreenNavProp>();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);

  const { control, handleSubmit, formState, reset } = useForm<PatientSignUpFormValues>({
    defaultValues: {
      email: '',
      fullName: '',
      occupation: '',
      password: '',
    },
  });
  const TypedController = useTypedController<PatientSignUpFormValues>({ control });

  const onSubmit = useCallback<SubmitHandler<PatientSignUpFormValues>>(
    async (data) => {
      try {
        showScreenLoading();
        unwrapResult(await dispatch(signUpPatient(data)));
        reset();
        navigation.navigate('UploadPhotoScreen');
      } catch (error: any) {
        console.log(error.message);
        showMessage({
          message: error.message,
          type: 'danger',
        });
      } finally {
        hideScreenLoading();
      }
    },
    [dispatch, hideScreenLoading, navigation, reset, showScreenLoading]
  );

  const onValidationError = useCallback<SubmitErrorHandler<PatientSignUpFormValues>>((errors) => {
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
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <TypedController
          name="fullName"
          rules={{ required: 'Nama lengkap wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Nama Lengkap"
              autoCapitalize="words"
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="occupation"
          rules={{ required: 'Pekerjaan wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Pekerjaan"
              autoCapitalize="words"
            />
          )}
        />
        <AppGap height={24} />
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
