import React, { FC, ReactNode } from 'react';
import {
  AccessibilityRole,
  AccessibilityState,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface AppTabItemProps {
  icon: ReactNode;
  label: string | ReactNode;
  tabItemColor: string;
  accessibilityRole: AccessibilityRole;
  accessibilityState?: AccessibilityState;
  accessibilityLabel?: string;
  testID?: string;
  onPress(): void;
  onLongPress(): void;
}

const AppTabItem: FC<AppTabItemProps> = (props) => (
  <TouchableOpacity {...props} style={styles.tabItem}>
    {props.icon}
    <Text style={{ ...styles.label, color: props.tabItemColor }}>{props.label}</Text>
  </TouchableOpacity>
);

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

export default AppTabItem;
