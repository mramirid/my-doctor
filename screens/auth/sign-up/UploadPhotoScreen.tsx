import { useNavigation } from '@react-navigation/core';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { FC, useCallback, useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import AddPhoto from '../../../assets/icons/AddPhoto';
import RemovePhoto from '../../../assets/icons/RemovePhoto';
import AppButton from '../../../components/atoms/AppButton';
import AppGap from '../../../components/atoms/AppGap';
import AppLink from '../../../components/atoms/AppLink';
import Header from '../../../components/molecules/header/Header';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import { AppLoadingIndicatorContext } from '../../../contexts/app-loading-indicator';
import { UploadPhotoScreenNavProp } from '../../../global-types/navigation';
import withStatusBar from '../../../hoc/withStatusBar';
import usePhotoPicker from '../../../hooks/usePhotoPicker';
import { selectUserAuth } from '../../../store/reducers/auth';
import { uploadPhoto } from '../../../store/thunks/auth';
import { useAppDispatch, useAppSelector } from '../../../store/types';

const UploadPhotoScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UploadPhotoScreenNavProp>();
  const { pickPhoto } = usePhotoPicker();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);

  const userAuth = useAppSelector(selectUserAuth);
  const [pickedPhoto, setPickedPhoto] = useState<string | null>(null);

  const startPickPhoto = useCallback(async () => setPickedPhoto(await pickPhoto()), [pickPhoto]);

  const uploadNewPhoto = async () => {
    try {
      showScreenLoading();
      unwrapResult(await dispatch(uploadPhoto({ newPhoto: pickedPhoto! })));
      navigation.popToTop();
      navigation.replace('HomeTab');
    } catch (error: any) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    } finally {
      hideScreenLoading();
    }
  };

  let photo: JSX.Element;
  if (pickedPhoto) {
    photo = (
      <>
        <Image source={{ uri: pickedPhoto }} style={styles.photo} />
        <RemovePhoto style={styles.actionPhoto} onPress={() => setPickedPhoto(null)} />
      </>
    );
  } else {
    photo = (
      <>
        <Image
          source={require('../../../assets/illustrations/user-photo-null.png')}
          style={styles.photo}
        />
        <AddPhoto style={styles.actionPhoto} />
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Unggah Foto" type="flat" onBackButtonPressed={navigation.goBack} />
      <View style={styles.body}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.photoContainer} onPress={startPickPhoto}>
            {photo}
          </TouchableOpacity>
          <AppGap height={26} />
          <Text style={styles.fullName}>{userAuth.fullName}</Text>
          <Text style={styles.occupation}>{userAuth.occupation}</Text>
        </View>
        <View>
          <AppButton
            title="Upload and Continue"
            color="accent"
            disabled={!pickedPhoto}
            onPress={uploadNewPhoto}
          />
          <AppLink style={styles.skipLink} onPress={() => navigation.replace('HomeTab')}>
            Skip for this
          </AppLink>
        </View>
      </View>
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
    justifyContent: 'space-between',
    paddingBottom: 64,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: Colors.Grey1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 130 / 2,
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  actionPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  fullName: {
    fontSize: 24,
    color: Colors.Dark,
    fontFamily: Fonts.NunitoSemiBold,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  occupation: {
    fontSize: 18,
    color: Colors.Grey2,
    fontFamily: Fonts.NunitoRegular,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  skipLink: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default withStatusBar(UploadPhotoScreen, 'dark', Colors.White);
