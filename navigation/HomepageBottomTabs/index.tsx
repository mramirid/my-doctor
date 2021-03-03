import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import AppBottomTabBar from '../../components/molecules/AppBottomTabBar';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import icons from '../../constants/icons';
import DoctorsOverviewScreen from '../../screens/doctors/DoctorsOverviewScreen';
import HospitalsScreen from '../../screens/hospitals/HospitalsScreen';
import MessagesScreen from '../../screens/messages/MessagesScreen';
import { HomepageBottomTabsParamList } from './types';

const Tab = createBottomTabNavigator<HomepageBottomTabsParamList>();

const HomepageBottomTabs: React.FC = () => (
  <Tab.Navigator
    tabBar={AppBottomTabBar}
    tabBarOptions={{
      activeTintColor: Colors.Green1,
      inactiveTintColor: Colors.Grey2,
      labelStyle: { fontFamily: Fonts.NunitoSemiBold },
    }}>
    <Tab.Screen
      name="DoctorsStack"
      component={DoctorsOverviewScreen}
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
