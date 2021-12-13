import { MaterialIcons } from '@expo/vector-icons';
import React, { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import AppBorderedItem from '../atoms/AppBorderedItem';

type Props = Readonly<{
  title: string;
  description: string;
  avatar: ReactNode;
  withArrowIcon?: true;
  style?: StyleProp<ViewStyle>;
  onPress(): void;
}>;

const ListItemBordered: FC<Props> = (props) => (
  <AppBorderedItem style={[styles.container, props.style]} onPress={props.onPress}>
    <View style={styles.avatarContainer}>{props.avatar}</View>
    <View style={styles.infoText}>
      <Text style={styles.title}>{props.title}</Text>
      {props.description && <Text style={styles.description}>{props.description}</Text>}
    </View>
    {props.withArrowIcon && <MaterialIcons name="navigate-next" size={24} color="black" />}
  </AppBorderedItem>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    maxWidth: 46,
    maxHeight: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.NunitoRegular,
    color: Colors.Dark,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.NunitoLight,
    color: Colors.Grey2,
  },
});

export default ListItemBordered;
