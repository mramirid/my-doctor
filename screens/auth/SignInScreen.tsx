import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text } from 'react-native';

import AppLogo from '../../assets/icons/AppLogo';
import AppButton from '../../components/atoms/AppButton';
import AppGap from '../../components/atoms/AppGap';
import AppLink from '../../components/atoms/AppLink';
import AppTextInput from '../../components/atoms/AppTextInput';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import { SignInScreenNavProp } from '../../global-types/navigation';
import withStatusBar from '../../hoc/withStatusBar';

interface FormValues {
  email: string;
  password: string;
}

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavProp>();
  const { control } = useForm<FormValues>();
  const TypedController = useTypedController<FormValues>({ control });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      showsVerticalScrollIndicator={false}>
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
      <AppButton style={styles.signInButton} title="Sign In" color="accent" onPress={() => null} />
      <AppLink style={styles.signUpLink} onPress={() => navigation.navigate('SignUpScreen')}>
        Create New Account
      </AppLink>
      <AppGap height={64} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
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
