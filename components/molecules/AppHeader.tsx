import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import icons from '../../constants/icons';
import AppGap from '../atoms/AppGap';
import AppTouchable from '../atoms/clickables/AppTouchable';

interface AppHeaderProps {
  title: string;
}

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <AppTouchable style={styles.backButton} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={icons.size} color={Colors.Dark1} />
      </AppTouchable>
      <Text style={styles.title}>{props.title}</Text>
      <AppGap width={icons.size} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.NunitoSemiBold,
    fontSize: 20,
    color: Colors.Dark1,
  },
});

export default React.memo(AppHeader);
