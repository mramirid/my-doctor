import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useContext } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
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
  Gender,
  genderOptions,
  specialistOptions,
} from '../../../constants/user';
import { AppLoadingIndicatorContext } from '../../../contexts/app-loading-indicator';
import withStatusBar from '../../../hoc/withStatusBar';
import { AppStackParamList } from '../../../navigation/AppStack';
import { signUpDoctor } from '../../../store/thunks/auth';
import { useAppDispatch } from '../../../store/types';
import { DoctorSignUpFormValues } from '../../../types/user';

type DoctorSignUpScreenNavProp = StackNavigationProp<AppStackParamList, 'DoctorSignUpScreen'>;

function DoctorSignUpScreen() {
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

  const onSubmit = async (data: DoctorSignUpFormValues) => {
    try {
      showScreenLoading();
      unwrapResult(await dispatch(signUpDoctor(data)));
      reset();
      navigation.navigate('UploadPhotoScreen');
    } catch (error: any) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    } finally {
      hideScreenLoading();
    }
  };

  const onValidationError = (errors: DeepMap<DoctorSignUpFormValues, FieldError>) => {
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        showMessage({
          message: (errors as any)[field].message,
          type: 'danger',
        });
        break;
      }
    }
  };

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
}

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
