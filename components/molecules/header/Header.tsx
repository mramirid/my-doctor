import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';
import AppGap from '../../atoms/AppGap';

type Props = Readonly<{
  title: string;
  type: 'flat' | 'dark';
  withBorderRadius?: boolean;
  onBackButtonPressed(): void;
}>;

export default function Header(props: Props) {
  const textColor = props.type === 'dark' ? Colors.White : Colors.Dark;
  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: props.type === 'dark' ? Colors.Dark : Colors.White,
    borderBottomLeftRadius: props.withBorderRadius ? 20 : 0,
    borderBottomRightRadius: props.withBorderRadius ? 20 : 0,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.backButton} onPress={props.onBackButtonPressed}>
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: textColor }]}>{props.title}</Text>
      <AppGap width={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 107,
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 24,
    width: 24,
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
