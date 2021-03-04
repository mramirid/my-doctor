import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ImageBackground, StyleSheet, View, Text, Platform } from 'react-native';

import AppLogo from '../assets/icons/AppLogo';
import AppGap from '../components/atoms/AppGap';
import AppButton from '../components/atoms/clickables/AppButton';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { GettingStartedScreenNavProp } from '../global-types/navigation';

const GetStartedScreen: React.FC = () => {
  const navigation = useNavigation<GettingStartedScreenNavProp>();
  return (
    <ImageBackground
      style={styles.screen}
      source={require('../assets/illustrations/get-started-bg.png')}>
      <View>
        <AppLogo />
        <Text style={styles.text}>Konsultasi dengan dokter jadi lebih mudah &amp; fleksibel</Text>
      </View>
      <View>
        <AppButton
          title="Get Started"
          color="accent"
          onPress={() => navigation.navigate('SignUpScreen')}
        />
        <AppGap height={16} />
        <AppButton
          title="Sign In"
          color="flat"
          onPress={() => navigation.navigate('SignInScreen')}
        />
      </View>
      <StatusBar style="light" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
    paddingTop: 40 + (Platform.OS === 'ios' ? 0 : Constants.statusBarHeight),
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: Fonts.NunitoSemiBold,
    fontSize: 28,
    color: Colors.White,
    marginTop: 90,
  },
});

export default GetStartedScreen;
