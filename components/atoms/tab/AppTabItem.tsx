import React, { ReactNode } from 'react';
import {
  AccessibilityRole,
  AccessibilityState,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ReadonlyDeep } from 'type-fest';

type Props = ReadonlyDeep<{
  icon: ReactNode;
  label: string | ReactNode;
  tabItemColor: string;
  accessibilityRole: AccessibilityRole;
  accessibilityState?: AccessibilityState;
  accessibilityLabel?: string;
  testID?: string;
  onPress(): void;
  onLongPress(): void;
}>;

export default function AppTabItem(props: Props) {
  return (
    <TouchableOpacity {...props} style={styles.tabItem}>
      {props.icon}
      <Text style={[styles.label, { color: props.tabItemColor }]}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    height: 70,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
  },
});
