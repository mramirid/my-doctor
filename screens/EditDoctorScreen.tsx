import { useTypedController } from '@hookform/strictly-typed';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { unwrapResult } from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import firebase from 'firebase';
import { useContext, useEffect } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AppButton from '../components/atoms/AppButton';
import AppGap from '../components/atoms/AppGap';
import AppPickerInput from '../components/atoms/AppPickerInput';
import AppTextInput from '../components/atoms/AppTextInput';
import Header from '../components/molecules/header/Header';
import UserProfileHeadline from '../components/molecules/profile/UserProfileHeadline';
import fireApp from '../config/firebase';
import Colors from '../constants/colors';
import { DoctorSpecialist, Gender, genderOptions, specialistOptions } from '../constants/user';
import { AppLoadingIndicatorContext } from '../contexts/app-loading-indicator';
import withStatusBar from '../hoc/withStatusBar';
import { AppStackParamList } from '../navigation/AppStack';
import { selectUserAuth } from '../store/reducers/auth';
import { updateProfile } from '../store/thunks/auth';
import { useAppDispatch, useAppSelector } from '../store/types';
import { DoctorData } from '../types/user';

type EditDoctorScreenNavProp = StackNavigationProp<AppStackParamList, 'EditDoctorScreen'>;

type FormValues = DoctorData & Readonly<{ oldPassword: string; newPassword: string }>;

async function fetchDoctorData(uid: string) {
  const data = await fireApp.database().ref(`users/${uid}`).once('value');
  const fetchedDoctor: DoctorData = data.val();
  return fetchedDoctor;
}

function EditDoctorScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<EditDoctorScreenNavProp>();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);

  const userAuth = useAppSelector(selectUserAuth);
  const { control, formState, handleSubmit, reset } = useForm<FormValues>();
  const TypedController = useTypedController<FormValues>({ control });

  useEffect(() => {
    (async () => {
      try {
        showScreenLoading();
        const fetchedDoctorData = await fetchDoctorData(userAuth.uid!);
        reset({ ...fetchedDoctorData });
      } catch (error: any) {
        showMessage({
          message: error.message ?? 'Gagal menjangkau server',
          type: 'danger',
          statusBarHeight: Constants.statusBarHeight,
        });
      } finally {
        hideScreenLoading();
      }
    })();
  }, [hideScreenLoading, reset, showScreenLoading, userAuth.uid]);

  const onSubmit = async (data: FormValues) => {
    try {
      showScreenLoading();
      if (!!data.oldPassword && !!data.newPassword) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          userAuth.email!,
          data.oldPassword
        );
        const patient = fireApp.auth().currentUser;
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
        statusBarHeight: Constants.statusBarHeight,
      });
      navigation.goBack();
    } catch (error: any) {
      showMessage({
        message: error.message,
        type: 'danger',
        statusBarHeight: Constants.statusBarHeight,
      });
    } finally {
      hideScreenLoading();
    }
  };

  const onValidationError = (errors: DeepMap<FormValues, FieldError>) => {
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
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="occupation"
          defaultValue={(userAuth.occupation ?? undefined) as DoctorSpecialist}
          render={(renderProps) => (
            <AppPickerInput
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
            />
          )}
        />
        <AppGap height={24} />
        <TypedController
          name="gender"
          defaultValue={Gender.Male}
          render={(renderProps) => (
            <AppPickerInput
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
}

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
