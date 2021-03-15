import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/core';
import { unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase';
import React, { FC, useCallback, useContext, useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppButton from '../components/atoms/AppButton';
import AppGap from '../components/atoms/AppGap';
import AppPickerInput from '../components/atoms/AppPickerInput';
import AppTextInput from '../components/atoms/AppTextInput';
import Header from '../components/molecules/header/Header';
import UserProfileHeadline from '../components/molecules/profile/UserProfileHeadline';
import Colors from '../constants/colors';
import { specialistOptions } from '../constants/doctor-specialist';
import Gender, { genderOptions } from '../constants/gender';
import { AppLoadingIndicatorContext } from '../contexts/app-loading-indicator';
import { EditDoctorScreenNavProp } from '../global-types/navigation';
import { FireDoctor } from '../global-types/user';
import withStatusBar from '../hoc/withStatusBar';
import { selectUserAuth } from '../store/reducers/auth';
import { updateProfile } from '../store/thunks/auth';
import { useAppDispatch, useAppSelector } from '../store/types';

interface FormValues extends FireDoctor {
  oldPassword: string;
  newPassword: string;
}

async function fetchDoctorData(uid: string) {
  const data = await firebase.database().ref(`users/${uid}`).once('value');
  const fetchedDoctor: FireDoctor = data.val();
  return fetchedDoctor;
}

const EditDoctorScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<EditDoctorScreenNavProp>();
  const { showLoading, hideLoading } = useContext(AppLoadingIndicatorContext);

  const userAuth = useAppSelector(selectUserAuth);
  const { control, formState, handleSubmit, reset } = useForm<FormValues>();
  const TypedController = useTypedController<FormValues>({ control });

  useEffect(() => {
    (async () => {
      try {
        showLoading();
        const fetchedDoctorData = await fetchDoctorData(userAuth.uid!);
        reset({ ...fetchedDoctorData });
      } catch (error) {
        showMessage({
          message: error.message || 'Gagal menjangkau server',
          type: 'danger',
        });
      } finally {
        hideLoading();
      }
    })();
  }, [hideLoading, reset, showLoading, userAuth.uid]);

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
          defaultValue={userAuth.photo}
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
          defaultValue={userAuth.fullName!}
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
          defaultValue={userAuth.occupation!}
          render={(renderProps) => (
            <AppPickerInput
              {...renderProps}
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
          defaultValue=""
          rules={{ required: 'Universitas wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Universitas"
              autoCapitalize="words"
              returnKeyType="next"
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="credentialId"
          defaultValue=""
          rules={{ required: 'Nomor STR wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Nomor STR"
              returnKeyType="next"
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="workplace"
          defaultValue=""
          rules={{ required: 'Alamat rumah sakit wajib diisi' }}
          render={(renderProps) => (
            <AppTextInput
              {...renderProps}
              onChangeText={(text) => renderProps.onChange(text)}
              label="Alamat Rumah Sakit"
              autoCapitalize="words"
              returnKeyType="next"
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="gender"
          defaultValue={Gender.Male}
          render={(renderProps) => (
            <AppPickerInput
              {...renderProps}
              label="Jenis Kelamin"
              selectedValue={renderProps.value}
              onValueChange={renderProps.onChange}
              options={genderOptions}
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

export default withStatusBar(EditDoctorScreen, 'dark', Colors.White);
