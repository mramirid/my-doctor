import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/core';
import { unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase';
import React, { FC, useCallback, useContext } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppButton from '../components/atoms/AppButton';
import AppGap from '../components/atoms/AppGap';
import AppTextInput from '../components/atoms/AppTextInput';
import Header from '../components/molecules/header/Header';
import UserProfileWithPhoto from '../components/molecules/profile/UserProfileWithPhoto';
import Colors from '../constants/colors';
import { EditUserProfileScreenNavProp } from '../global-types/navigation';
import { SignUpFormValues } from '../global-types/patient';
import withStatusBar from '../hoc/withStatusBar';
import { selectUserAuth } from '../store/reducers/auth';
import { updateProfile } from '../store/thunks/auth';
import { useAppDispatch, useAppSelector } from '../store/types';
import { AppLoadingIndicatorContext } from './contexts/app-loading-indicator';

interface FormValues {
  fullName: string;
  occupation: string;
  photo: string | null;
  oldPassword: string;
  newPassword: string;
}

const EditUserProfileScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<EditUserProfileScreenNavProp>();
  const { showLoading, hideLoading } = useContext(AppLoadingIndicatorContext);

  const userAuth = useAppSelector(selectUserAuth);
  const { control, formState, handleSubmit, reset } = useForm<FormValues>();
  const TypedController = useTypedController<FormValues>({ control });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      try {
        showLoading();
        if (!!data.oldPassword && !!data.newPassword) {
          const credential = firebase.auth.EmailAuthProvider.credential(
            userAuth.email!,
            data.oldPassword
          );
          const patient = firebase.auth().currentUser;
          await patient?.reauthenticateWithCredential(credential);
          patient?.updatePassword(data.newPassword);
        }
        unwrapResult(
          await dispatch(
            updateProfile({
              fullName: data.fullName,
              occupation: data.occupation,
              photo: data.photo,
            })
          )
        );
        reset({
          ...data,
          oldPassword: '',
          newPassword: '',
        });
        showMessage({
          message: 'Profile berhasil diperbaharui',
          type: 'success',
        });
        navigation.goBack();
      } catch (error) {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      } finally {
        hideLoading();
      }
    },
    [dispatch, hideLoading, navigation, reset, showLoading, userAuth.email]
  );

  const onValidationError = useCallback<SubmitErrorHandler<SignUpFormValues>>((errors) => {
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
      <Header title="Profile" type="flat" onBackButtonPressed={navigation.goBack} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <TypedController
          name="photo"
          defaultValue={userAuth.photo}
          render={(renderProps) => (
            <UserProfileWithPhoto
              style={styles.profileWithPhoto}
              isEdit
              photo={renderProps.value}
              onPhotoTaken={(pickedPhoto) => renderProps.onChange(pickedPhoto)}
            />
          )}
        />
        <TypedController
          name="fullName"
          defaultValue={userAuth.fullName ?? ''}
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
          defaultValue={userAuth.occupation ?? ''}
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
        <AppTextInput
          defaultValue={userAuth.email!}
          label="Email Address"
          editable={false}
          selectTextOnFocus={false}
        />
        <AppGap height={24} />
        <TypedController
          name="oldPassword"
          defaultValue=""
          rules={{
            validate: (value) => {
              if (value.length === 0) return true;
              return value.length >= 6 || 'Password lama minimal 6 abjad';
            },
          }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Password"
              placeholder="Password lama..."
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
        />
        <AppGap height={12} />
        <TypedController
          name="newPassword"
          defaultValue=""
          rules={{
            validate: (value) => {
              if (value.length === 0) return true;
              return value.length >= 6 || 'Password baru minimal 6 abjad';
            },
          }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              placeholder="Password baru..."
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
