import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';

import AppLogo from '../../assets/icons/AppLogo';
import AppGap from '../../components/atoms/AppGap';
import AppTextInput from '../../components/atoms/AppTextInput';
import AppTextLink from '../../components/atoms/AppTextLink';
import AppButton from '../../components/atoms/clickables/AppButton';
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
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <AppLogo />
      <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
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
      <Controller
        name="password"
        control={control}
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
      <AppTextLink>Forgot My Password</AppTextLink>
      <AppButton style={styles.signInButton} title="Sign In" color="accent" onPress={() => null} />
      <AppTextLink style={styles.signUpLink}>Create New Account</AppTextLink>
      <AppGap height={64} />
      <StatusBar style="dark" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    paddingTop: 40 + (Platform.OS === 'ios' ? 0 : Constants.statusBarHeight),
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

export default SignInScreen;
