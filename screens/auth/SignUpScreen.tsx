import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';

import TextInput from '../../components/atoms/TextInput';
import Button from '../../components/atoms/clickables/Button';
import Header from '../../components/molecules/Header';

interface SignUpData {
  fullName: string;
  occupation: string;
  email: string;
  password: string;
}

const SignUpScreen: React.FC = () => {
  const { control } = useForm<SignUpData>({
    defaultValues: {
      fullName: '',
      occupation: '',
      email: '',
      password: '',
    },
  });

  return (
    <>
      <StatusBar style="dark" />
      <Header title="Daftar Akun" />
      <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
        <Controller
          name="fullName"
          control={control}
          rules={{ required: 'Nama lengkap wajib diisi' }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Nama Lengkap"
              autoCapitalize="words"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email wajib diisi',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Email tidak valid',
            },
          }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Pekerjaan"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email wajib diisi',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Email tidak valid',
            },
          }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Email Address"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password wajib diisi' }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Password"
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
            />
          )}
        />
        <Button title="Continue" type="primary" onPress={() => null} />
      </ScrollView>
    </>
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
});

export default SignUpScreen;
