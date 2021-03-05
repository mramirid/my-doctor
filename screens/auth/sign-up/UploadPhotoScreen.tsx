import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import AddPhoto from '../../../assets/icons/AddPhoto';
import AppLink from '../../../components/atoms/AppLink';
import AppButton from '../../../components/atoms/clickables/AppButton';
import Header from '../../../components/molecules/header/Header';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import withStatusBar from '../../../hoc/withStatusBar';

const UploadPhotoScreen: React.FC = () => (
  <View style={styles.screen}>
    <Header title="Unggah Foto" type="flat" />
    <View style={styles.body}>
      <View style={styles.profile}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../../assets/illustrations/user-photo-null.png')}
            style={styles.avatar}
          />
          <AddPhoto style={styles.addPhotoIcon} />
        </View>
        <Text style={styles.fullName}>Amir Muhammad Hakim</Text>
        <Text style={styles.occupation}>Software Engineer</Text>
      </View>
      <View>
        <AppButton title="Upload and Continue" color="accent" onPress={() => null} />
        <AppLink style={styles.skipLink}>Skip for this</AppLink>
      </View>
    </View>
  </View>
);

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
  avatarContainer: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: Colors.Grey2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 130 / 2,
  },
  avatar: {
    width: 110,
    height: 110,
  },
  addPhotoIcon: {
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
