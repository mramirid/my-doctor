import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { FC, useCallback, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import AddPhoto from '../../../assets/icons/AddPhoto';
import RemovePhoto from '../../../assets/icons/RemovePhoto';
import AppButton from '../../../components/atoms/AppButton';
import AppLink from '../../../components/atoms/AppLink';
import AppLoadingIndicator from '../../../components/molecules/AppLoadingIndicator';
import Header from '../../../components/molecules/header/Header';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import { UploadPhotoScreenNavProp } from '../../../global-types/navigation';
import withStatusBar from '../../../hoc/withStatusBar';

const UploadPhotoScreen: FC = () => {
  const navigation = useNavigation<UploadPhotoScreenNavProp>();

  const [photoUri, setPhotoUri] = useState('');
  const [isLoading] = useState(false);

  const pickPhoto = useCallback(async () => {
    const permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (!permission.granted) {
      Alert.alert(
        'Izin Akses Diperlukan',
        'Perizinan akses ke penyimpanan diperlukan untuk mengambil gambar',
        [{ text: 'OK' }]
      );
      return;
    }

    const pickResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!pickResult.cancelled) {
      setPhotoUri(pickResult.uri);
    }
  }, []);

  let photo: JSX.Element;
  if (photoUri) {
    photo = (
      <>
        <Image source={{ uri: photoUri }} style={styles.photo} />
        <RemovePhoto style={styles.actionPhoto} />
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
          <TouchableOpacity style={styles.photoContainer} onPress={pickPhoto}>
            {photo}
          </TouchableOpacity>
          <Text style={styles.fullName}>Amir Muhammad Hakim</Text>
          <Text style={styles.occupation}>Software Engineer</Text>
        </View>
        <View>
          <AppButton
            title="Upload and Continue"
            color="accent"
            disabled={!photoUri}
            onPress={() => null}
          />
          <AppLink style={styles.skipLink} onPress={() => null}>
            Skip for this
          </AppLink>
        </View>
      </View>
      {isLoading && <AppLoadingIndicator />}
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
  },
  occupation: {
    fontSize: 18,
    fontFamily: Fonts.NunitoRegular,
    textAlign: 'center',
    color: Colors.Grey2,
    marginTop: 4,
  },
  skipLink: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default withStatusBar(UploadPhotoScreen, 'dark', Colors.White);
