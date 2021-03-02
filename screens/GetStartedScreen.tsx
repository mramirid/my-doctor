import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

import AppLogo from '../components/atoms/AppLogo';
import Gap from '../components/atoms/Gap';
import Button from '../components/atoms/clickables/Button';
import Fonts from '../constants/fonts';
import { GetStartedScreenNavProp } from '../navigation/GetStartedStack/types';

const GetStartedScreen: React.FC = () => {
  const navigation = useNavigation<GetStartedScreenNavProp>();

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.screen}
        source={require('../assets/illustrations/get-started-bg.png')}>
        <View>
          <AppLogo />
          <Text style={styles.text}>Konsultasi dengan dokter jadi lebih mudah &amp; fleksibel</Text>
        </View>
        <View>
          <Button
            title="Get Started"
            type="primary"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
          <Gap height={16} />
          <Button
            title="Sign In"
            type="secondary"
            onPress={() => navigation.navigate('SignInScreen')}
          />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: Fonts.NunitoSemiBold,
    fontSize: 28,
    color: 'white',
    marginTop: 90,
  },
});

export default GetStartedScreen;
