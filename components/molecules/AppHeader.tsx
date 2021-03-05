import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import icons from '../../constants/icons';
import AppGap from '../atoms/AppGap';
import AppTouchable from '../atoms/clickables/AppTouchable';

interface AppHeaderProps {
  title: string;
  type: 'flat' | 'dark';
  withBorderRadius?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const navigation = useNavigation();

  const textColor = props.type === 'dark' ? Colors.White : Colors.Dark;
  const containerStyle: ViewStyle = {
    backgroundColor: props.type === 'dark' ? Colors.Dark : Colors.White,
    borderBottomLeftRadius: props.withBorderRadius ? 20 : 0,
    borderBottomRightRadius: props.withBorderRadius ? 20 : 0,
  };

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <AppTouchable style={styles.backButton} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={icons.size} color={textColor} />
      </AppTouchable>
      <Text style={{ ...styles.title, color: textColor }}>{props.title}</Text>
      <AppGap width={icons.size * 2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: icons.size * 2,
    width: icons.size * 2,
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
    color: Colors.Dark,
  },
});

export default React.memo(AppHeader);
