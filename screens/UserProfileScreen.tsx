import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import firebase from 'firebase';
import React, { FC, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import ListItemBordered from '../components/molecules/ListItemBordered';
import Header from '../components/molecules/header/Header';
import UserProfileWithPhoto from '../components/molecules/profile/UserProfileWithPhoto';
import Colors from '../constants/colors';
import { UserProfileScreenNavProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';
import { logout, selectUserAuth } from '../store/reducers/auth';
import { useAppDispatch, useAppSelector } from '../store/types';
import { AppLoadingIndicatorContext } from './contexts/app-loading-indicator';

const UserProfileScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UserProfileScreenNavProp>();
  const { showLoading, hideLoading } = useContext(AppLoadingIndicatorContext);

  const userAuth = useAppSelector(selectUserAuth);

  const signOut = async () => {
    try {
      showLoading();
      await firebase.auth().signOut();
      dispatch(logout());
      navigation.replace('GetStartedScreen');
    } catch (error) {
      showMessage({
        message: error.message || 'Failed to sign out',
        type: 'danger',
      });
    } finally {
      hideLoading();
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="Profile" type="flat" onBackButtonPressed={navigation.goBack} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <UserProfileWithPhoto style={styles.profileWithPhoto} isEdit={false} patient={userAuth} />
        <ListItemBordered
          style={styles.settingItem}
          title="Edit Profile"
          description="Last updated yesterday"
          avatar={
            <MaterialCommunityIcons name="account-circle-outline" size={24} color={Colors.Green2} />
          }
          withArrowIcon
          onPress={() => navigation.navigate('EditUserProfileScreen')}
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
          onPress={signOut}
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
