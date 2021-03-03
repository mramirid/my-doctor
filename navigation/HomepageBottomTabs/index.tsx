import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import * as React from 'react';
import { Platform } from 'react-native';

import AppBottomTabBar from '../../components/molecules/AppBottomTabBar';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import icons from '../../constants/icons';
import HospitalsScreen from '../../screens/hospitals/HospitalsScreen';
import MessagesScreen from '../../screens/messages/MessagesScreen';
import DoctorsStack from '../DoctorsStack';
import { HomepageBottomTabsParamList } from './types';

const Tab = createBottomTabNavigator<HomepageBottomTabsParamList>();

const HomepageBottomTabs: React.FC = () => (
  <Tab.Navigator
    sceneContainerStyle={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}
    tabBar={AppBottomTabBar}
    tabBarOptions={{
      activeTintColor: Colors.Green1,
      inactiveTintColor: Colors.Grey2,
      labelStyle: { fontFamily: Fonts.NunitoSemiBold },
    }}>
    <Tab.Screen
      name="DoctorsStack"
      component={DoctorsStack}
      options={{
        tabBarLabel: 'Doctor',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons name="face-outline" size={icons.size} color={props.color} />
        ),
      }}
    />
    <Tab.Screen
      name="MessagesStack"
      component={MessagesScreen}
      options={{
        tabBarLabel: 'Messages',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            name="message-processing-outline"
            size={icons.size}
            color={props.color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="HospitalsScreen"
      component={HospitalsScreen}
      options={{
        tabBarLabel: 'Hospitals',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons name="map-outline" size={icons.size} color={props.color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default HomepageBottomTabs;
