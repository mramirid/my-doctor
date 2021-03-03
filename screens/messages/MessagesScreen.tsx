import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import AppTabScreen from '../../components/atoms/bottom-tab/AppTabScreen';
import ListDoctor from '../../components/molecules/ListDoctor';

const MessagesScreen: React.FC = () => (
  <AppTabScreen contentStyle={styles.screenScrollViewContent}>
    <Text>Messages</Text>
    <ListDoctor />
  </AppTabScreen>
);

const styles = StyleSheet.create({
  screenScrollViewContent: {
    paddingTop: 30,
    paddingHorizontal: 16,
  },
});

export default MessagesScreen;
