import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ListItemBordered from '../components/molecules/ListItemBordered';
import ProfileWithPhoto from '../components/molecules/ProfileWithPhoto';
import Header from '../components/molecules/header/Header';
import Colors from '../constants/colors';
import patient from '../constants/dummies/patient';
import withStatusBar from '../hoc/withStatusBar';

const UserProfileScreen: React.FC = () => (
  <View style={styles.screen}>
    <Header title="Profile" type="flat" />
    <ScrollView style={styles.body}>
      <ProfileWithPhoto
        style={styles.profileWithPhoto}
        name={patient.name}
        occupation={patient.occupation}
        photoUrl={patient.photoUrl}
      />
      <ListItemBordered
        title="Edit Profile"
        description="Last updated yesterday"
        avatar={
          <MaterialCommunityIcons name="account-circle-outline" size={24} color={Colors.Green2} />
        }
        withArrowIcon
        onPress={() => null}
      />
      <ListItemBordered
        title="Language"
        description="Available 12 languages"
        avatar={<MaterialCommunityIcons name="translate" size={24} color={Colors.Green2} />}
        withArrowIcon
        onPress={() => null}
      />
      <ListItemBordered
        title="Give Us Rate"
        description="On Google Play Store"
        avatar={<MaterialCommunityIcons name="star-outline" size={24} color={Colors.Green2} />}
        withArrowIcon
        onPress={() => null}
      />
      <ListItemBordered
        title="Help Center"
        description="Read our guidelines"
        avatar={<MaterialCommunityIcons name="note-text-outline" size={24} color={Colors.Green2} />}
        withArrowIcon
        onPress={() => null}
      />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  profileWithPhoto: {
    marginTop: 10,
    marginBottom: 30,
  },
});

export default withStatusBar(UserProfileScreen, 'dark', Colors.White);
