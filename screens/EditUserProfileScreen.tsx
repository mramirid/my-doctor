import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppButton from '../components/atoms/AppButton';
import AppGap from '../components/atoms/AppGap';
import AppTextInput from '../components/atoms/AppTextInput';
import ProfileWithPhoto from '../components/molecules/ProfileWithPhoto';
import Header from '../components/molecules/header/Header';
import Colors from '../constants/colors';
import patient from '../constants/dummies/patient';
import { EditUserProfileScreenNavProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';

interface FormValues {
  fullName: string;
  occupation: string;
  email: string;
  password: string;
}

const EditUserProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditUserProfileScreenNavProp>();
  const { control } = useForm<FormValues>();
  const TypedController = useTypedController<FormValues>({ control });

  return (
    <View style={styles.screen}>
      <Header title="Profile" type="flat" onBackButtonPressed={navigation.goBack} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <ProfileWithPhoto
          style={styles.profileWithPhoto}
          photoUrl={patient.photoUrl}
          onRemoveAvatar={() => null}
        />
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
          style={styles.submitButton}
          title="Save Profile"
          color="accent"
          onPress={navigation.goBack}
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
    paddingHorizontal: 40,
  },
  profileWithPhoto: {
    marginTop: 10,
    marginBottom: 30,
  },
  submitButton: {
    marginBottom: 48,
  },
});

export default withStatusBar(EditUserProfileScreen, 'dark', Colors.White);
