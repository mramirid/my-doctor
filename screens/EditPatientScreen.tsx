import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/core';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { FC, useCallback, useContext } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppButton from '../components/atoms/AppButton';
import AppGap from '../components/atoms/AppGap';
import AppTextInput from '../components/atoms/AppTextInput';
import Header from '../components/molecules/header/Header';
import UserProfileHeadline from '../components/molecules/profile/UserProfileHeadline';
import firebase from '../config/firebase';
import Colors from '../constants/colors';
import { AppLoadingIndicatorContext } from '../contexts/app-loading-indicator';
import { EditPatientScreenNavProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';
import { selectUserAuth } from '../store/reducers/auth';
import { updateProfile } from '../store/thunks/auth';
import { useAppDispatch, useAppSelector } from '../store/types';

interface FormValues {
  photo: string | null;
  fullName: string;
  occupation: string;
  oldPassword: string;
  newPassword: string;
}

const EditPatientScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<EditPatientScreenNavProp>();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);

  const userAuth = useAppSelector(selectUserAuth);
  const { control, formState, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      photo: userAuth.photo,
      fullName: userAuth.fullName!,
      occupation: userAuth.occupation!,
      oldPassword: '',
      newPassword: '',
    },
  });
  const TypedController = useTypedController<FormValues>({ control });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      try {
        showScreenLoading();
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
        hideScreenLoading();
      }
    },
    [dispatch, hideScreenLoading, navigation, reset, showScreenLoading, userAuth.email]
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
      <Header title="Profile" type="flat" onBackButtonPressed={navigation.goBack} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <TypedController
          name="photo"
          render={(renderProps) => (
            <UserProfileHeadline
              style={styles.profileWithPhoto}
              isEdit
              photo={renderProps.value}
              onPhotoTaken={(pickedPhoto) => renderProps.onChange(pickedPhoto)}
            />
          )}
        />
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
        <AppTextInput
          defaultValue={userAuth.email!}
          label="Email Address"
          editable={false}
          selectTextOnFocus={false}
        />
        <AppGap height={24} />
        <TypedController
          name="oldPassword"
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
            />
          )}
        />
        <AppGap height={12} />
        <TypedController
          name="newPassword"
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

export default withStatusBar(EditPatientScreen, 'dark', Colors.White);
