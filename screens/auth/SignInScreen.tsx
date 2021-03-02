import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, ScrollView } from 'react-native';

import AppLogo from '../../components/atoms/AppLogo';
import Gap from '../../components/atoms/Gap';
import Link from '../../components/atoms/Link';
import Button from '../../components/atoms/clickables/Button';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface SignInData {
  email: string;
  password: string;
}

const SignInScreen: React.FC = () => {
  const { control } = useForm<SignInData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
        <AppLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <Gap height={40} />
        <Text style={styles.label}>Email Address</Text>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email address',
            },
          }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={(text) => renderProps.onChange(text)}
            />
          )}
        />
        <Gap height={24} />
        <Text style={styles.label}>Password</Text>
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={(renderProps) => (
            <TextInput
              {...renderProps}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
              onChangeText={(text) => renderProps.onChange(text)}
            />
          )}
        />
        <Gap height={10} />
        <Link>Forgot My Password</Link>
        <Button style={styles.signInButton} title="Sign In" type="primary" onPress={() => null} />
        <Link style={styles.signUpLink}>Create New Account</Link>
        <Gap height={64} />
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
  title: {
    marginVertical: 40,
    maxWidth: 155,
    fontSize: 20,
    fontFamily: Fonts.NunitoSemiBold,
    color: Colors.Primary,
  },
  label: {
    fontFamily: Fonts.NunitoRegular,
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 22,
    color: Colors.Light,
  },
  input: {
    height: 45,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.ExtraLight,
    borderRadius: 10,
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

export default SignInScreen;
