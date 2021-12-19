import { MaterialIcons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Colors from '../../constants/colors';
import AppBorderedItem from '../atoms/AppBorderedItem';

type Props = Readonly<{
  title: string;
  description: string;
  avatar: ReactNode;
  withArrowIcon?: true;
  style?: StyleProp<ViewStyle>;
  onPress(): void;
}>;

export default function ListItemBordered(props: Props) {
  return (
    <AppBorderedItem style={[styles.container, props.style]} onPress={props.onPress}>
      <View style={styles.avatarContainer}>{props.avatar}</View>
      <View style={styles.infoText}>
        <Text style={styles.title}>{props.title}</Text>
        {props.description && <Text style={styles.description}>{props.description}</Text>}
      </View>
      {props.withArrowIcon && <MaterialIcons name="navigate-next" size={24} color="black" />}
    </AppBorderedItem>
  );
}

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
    fontFamily: 'Nunito_400Regular',
    color: Colors.Dark,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Nunito_300Light',
    color: Colors.Grey2,
  },
});
