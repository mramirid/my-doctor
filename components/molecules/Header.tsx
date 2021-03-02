import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props) => (
  <View style={styles.header}>
    <Text>The Header</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {},
});

export default Header;
