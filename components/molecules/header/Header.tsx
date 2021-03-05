import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import AppGap from '../../atoms/AppGap';
import AppTouchable from '../../atoms/clickables/AppTouchable';

interface HeaderProps {
  title: string;
  type: 'flat' | 'dark';
  withBorderRadius?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
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
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </AppTouchable>
      <Text style={{ ...styles.title, color: textColor }}>{props.title}</Text>
      <AppGap width={48} />
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
    height: 48,
    width: 48,
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
  },
});

export default React.memo(Header);
