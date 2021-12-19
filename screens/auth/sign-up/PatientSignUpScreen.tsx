import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { unwrapResult } from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import { useContext } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppButton from '../../../components/atoms/AppButton';
import AppGap from '../../../components/atoms/AppGap';
import AppTextInput from '../../../components/atoms/AppTextInput';
import Header from '../../../components/molecules/header/Header';
import Colors from '../../../constants/colors';
import { AppLoadingIndicatorContext } from '../../../contexts/app-loading-indicator';
import withStatusBar from '../../../hoc/withStatusBar';
import { AppStackParamList } from '../../../navigation/AppStack';
import { signUpPatient } from '../../../store/thunks/auth';
import { useAppDispatch } from '../../../store/types';
import { PatientSignUpFormValues } from '../../../types/user';

type PatientSignUpScreenNavProp = StackNavigationProp<AppStackParamList, 'PatientSignUpScreen'>;

function SignUpScreen() {
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

  const onSubmit = async (data: PatientSignUpFormValues) => {
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
        statusBarHeight: Constants.statusBarHeight,
      });
    } finally {
      hideScreenLoading();
    }
  };

  const onValidationError = (errors: DeepMap<PatientSignUpFormValues, FieldError>) => {
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

export default withStatusBar(SignUpScreen, 'dark', Colors.White);
