import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ListItemBordered from '../components/molecules/ListItemBordered';
import ProfileWithPhoto from '../components/molecules/ProfileWithPhoto';
import Header from '../components/molecules/header/Header';
import Colors from '../constants/colors';
import patient from '../constants/dummies/patient';
import { UserProfileScreenNavProp } from '../global-types/navigation';
import withStatusBar from '../hoc/withStatusBar';

const UserProfileScreen: React.FC = () => {
  const navigation = useNavigation<UserProfileScreenNavProp>();
  return (
    <View style={styles.screen}>
      <Header title="Profile" type="flat" />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <ProfileWithPhoto
          style={styles.profileWithPhoto}
          name={patient.name}
          description={patient.occupation}
          photoUrl={patient.photoUrl}
        />
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
          title="Help Center"
          description="Read our guidelines"
          avatar={
            <MaterialCommunityIcons name="note-text-outline" size={24} color={Colors.Green2} />
          }
          withArrowIcon
          onPress={() => null}
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
