import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface RatedDoctorProps {}

const RatedDoctor: React.FC<RatedDoctorProps> = (props) => (
  <View>
    <Text>Rated Doctor Component</Text>
  </View>
);

const styles = StyleSheet.create({});

export default RatedDoctor;
