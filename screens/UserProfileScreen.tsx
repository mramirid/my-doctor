import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { FC, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import ListItemBordered from '../components/molecules/ListItemBordered';
import Header from '../components/molecules/header/Header';
import UserProfileHeadline from '../components/molecules/profile/UserProfileHeadline';
import firebase from '../config/firebase';
import Colors from '../constants/colors';
import { AppLoadingIndicatorContext } from '../contexts/app-loading-indicator';
import { UserProfileScreenNavProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';
import { signOut, selectUserAuth } from '../store/reducers/auth';
import { useAppDispatch, useAppSelector } from '../store/types';

const UserProfileScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UserProfileScreenNavProp>();
  const { showScreenLoading, hideScreenLoading } = useContext(AppLoadingIndicatorContext);

  const userAuth = useAppSelector(selectUserAuth);

  const startSignOut = async () => {
    try {
      showScreenLoading();
      await firebase.auth().signOut();
      dispatch(signOut());
      navigation.popToTop();
      navigation.replace('GetStartedScreen');
    } catch (error: any) {
      showMessage({
        message: error.message ?? 'Failed to sign out',
        type: 'danger',
      });
    } finally {
      hideScreenLoading();
    }
  };

  const editProfile = () => {
    if (userAuth.isDoctor) {
      navigation.navigate('EditDoctorScreen');
    } else {
      navigation.navigate('EditPatientScreen');
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="Profile" type="flat" onBackButtonPressed={navigation.goBack} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <UserProfileHeadline
          style={styles.profileWithPhoto}
          isEdit={false}
          fullName={userAuth.fullName!}
          occupation={userAuth.occupation!}
          photo={userAuth.photo}
        />
        <ListItemBordered
          style={styles.settingItem}
          title="Edit Profile"
          description="Last updated yesterday"
          avatar={
            <MaterialCommunityIcons name="account-circle-outline" size={24} color={Colors.Green2} />
          }
          withArrowIcon
          onPress={editProfile}
        />
        <ListItemBordered
          style={styles.settingItem}
          title="Language"
          description="Available 12 languages"
          avatar={<MaterialCommunityIcons name="translate" size={24} color={Colors.Green2} />}
          withArrowIcon
          onPress={() => null}
        />
        <ListItemBordered
          style={styles.settingItem}
          title="Give Us Rate"
          description="On Google Play Store"
          avatar={<MaterialCommunityIcons name="star-outline" size={24} color={Colors.Green2} />}
          withArrowIcon
          onPress={() => null}
        />
        <ListItemBordered
          style={styles.settingItem}
          title="Sign Out"
          description="Read our guidelines"
          avatar={
            <MaterialCommunityIcons name="note-text-outline" size={24} color={Colors.Green2} />
          }
          withArrowIcon
          onPress={startSignOut}
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
  },
  profileWithPhoto: {
    marginTop: 10,
    marginBottom: 26,
  },
  settingItem: {
    marginTop: 16,
  },
});

export default withStatusBar(UserProfileScreen, 'dark', Colors.White);
