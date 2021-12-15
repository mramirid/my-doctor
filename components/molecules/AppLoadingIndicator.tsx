import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/colors';

export default function AppLoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.Green2} />
      <Text style={styles.text}>Mohon Tunggu...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    color: Colors.Green2,
    fontFamily: 'Nunito_600SemiBold',
    marginTop: 10,
  },
});
