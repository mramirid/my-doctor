import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppButton from '../../../components/atoms/AppButton';
import AppGap from '../../../components/atoms/AppGap';
import AppTextInput from '../../../components/atoms/AppTextInput';
import AppLoadingIndicator from '../../../components/molecules/AppLoadingIndicator';
import Header from '../../../components/molecules/header/Header';
import firebase from '../../../config/firebase';
import Colors from '../../../constants/colors';
import { SignUpScreenNavProp } from '../../../global-types/navigation';
import withStatusBar from '../../../hoc/withStatusBar';

interface FormValues {
  fullName: string;
  occupation: string;
  email: string;
  password: string;
}

interface CreatedPatient {
  fullName: string;
  email: string;
  occupation: string;
  photoUrl: string;
}

const SignUpScreen: FC = () => {
  const navigation = useNavigation<SignUpScreenNavProp>();
  const { control, handleSubmit, formState, reset } = useForm<FormValues>();
  const TypedController = useTypedController<FormValues>({ control });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password);

        const user = userCredential.user;
        const createdUser: CreatedPatient = {
          fullName: data.fullName,
          email: data.email,
          occupation: data.occupation,
          photoUrl: '',
        };
        await firebase.database().ref(`users/${user!.uid}`).set(createdUser);
        reset();
      } catch (error) {
        showMessage({
          message: error.message || 'Terjadi kesalahan',
          type: 'danger',
        });
      }
    },
    [reset]
  );

  const onValidationError = useCallback<SubmitErrorHandler<FormValues>>((errors) => {
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
        <AppGap height={40} />
        <AppButton
          title="Continue"
          color="accent"
          onPress={handleSubmit(onSubmit, onValidationError)}
        />
      </ScrollView>
      {formState.isSubmitting && <AppLoadingIndicator />}
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
