import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import AppBottomTabBar from '../components/molecules/AppTabBar';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { HomeTabParamList } from '../global-types/navigation';
import DoctorsOverviewScreen from '../screens/tab/DoctorsOverviewScreen';
import HospitalsScreen from '../screens/tab/HospitalsScreen';
import MessagesScreen from '../screens/tab/MessagesScreen';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTab: React.FC = () => (
  <Tab.Navigator
    tabBar={AppBottomTabBar}
    tabBarOptions={{
      activeTintColor: Colors.Green2,
      inactiveTintColor: Colors.Grey3,
      labelStyle: { fontFamily: Fonts.NunitoSemiBold },
    }}>
    <Tab.Screen
      name="DoctorsOverviewScreen"
      component={DoctorsOverviewScreen}
      options={{
        tabBarLabel: 'Doctor',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons name="face-outline" size={24} color={props.color} />
        ),
      }}
    />
    <Tab.Screen
      name="MessagesScreen"
      component={MessagesScreen}
      options={{
        tabBarLabel: 'Messages',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons name="message-processing-outline" size={24} color={props.color} />
        ),
      }}
    />
    <Tab.Screen
      name="HospitalsScreen"
      component={HospitalsScreen}
      options={{
        tabBarLabel: 'Hospitals',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons name="map-outline" size={24} color={props.color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default HomeTab;