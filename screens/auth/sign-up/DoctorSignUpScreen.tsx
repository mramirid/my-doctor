import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/native';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { FC, useCallback, useContext } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppButton from '../../../components/atoms/AppButton';
import AppGap from '../../../components/atoms/AppGap';
import AppPickerInput from '../../../components/atoms/AppPickerInput';
import AppTextInput from '../../../components/atoms/AppTextInput';
import Header from '../../../components/molecules/header/Header';
import Colors from '../../../constants/colors';
import {
  DoctorSpecialist,
  specialistOptions,
  Gender,
  genderOptions,
} from '../../../constants/user';
import { AppLoadingIndicatorContext } from '../../../contexts/app-loading-indicator';
import { DoctorSignUpScreenNavProp } from '../../../global-types/navigation';
import { DoctorSignUpFormValues } from '../../../global-types/user';
import withStatusBar from '../../../hoc/withStatusBar';
import { signUpDoctor } from '../../../store/thunks/auth';
import { useAppDispatch } from '../../../store/types';

const DoctorSignUpScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<DoctorSignUpScreenNavProp>();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);

  const { control, handleSubmit, formState, reset } = useForm<DoctorSignUpFormValues>({
    defaultValues: {
      fullName: '',
      occupation: DoctorSpecialist.GeneralPractitioner,
      almamater: '',
      credentialId: '',
      workplace: '',
      gender: Gender.Male,
      email: '',
      password: '',
    },
  });
  const TypedController = useTypedController<DoctorSignUpFormValues>({ control });

  const onSubmit = useCallback<SubmitHandler<DoctorSignUpFormValues>>(
    async (data) => {
      try {
        showScreenLoading();
        unwrapResult(await dispatch(signUpDoctor(data)));
        reset();
        navigation.navigate('UploadPhotoScreen');
      } catch (error) {
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

  const onValidationError = useCallback<SubmitErrorHandler<DoctorSignUpFormValues>>((errors) => {
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
          render={(renderProps) => (
            <AppPickerInput
              {...renderProps}
              label="Kategori"
              selectedValue={renderProps.value}
              onValueChange={renderProps.onChange}
              options={specialistOptions}
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="almamater"
          rules={{ required: 'Universitas wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Universitas"
              autoCapitalize="words"
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="credentialId"
          rules={{ required: 'Nomor STR wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Nomor STR"
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="workplace"
          rules={{ required: 'Alamat rumah sakit wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Alamat Rumah Sakit"
              autoCapitalize="words"
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="gender"
          render={(renderProps) => (
            <AppPickerInput
              {...renderProps}
              label="Jenis Kelamin"
              selectedValue={renderProps.value}
              onValueChange={renderProps.onChange}
              options={genderOptions}
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
        <AppGap height={40} />
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

export default withStatusBar(DoctorSignUpScreen, 'dark', Colors.White);
