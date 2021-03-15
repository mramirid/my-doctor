import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';

import AppBottomTabBar from '../components/molecules/AppTabBar';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import { HomeTabParamList } from '../global-types/navigation';
import DoctorHomeScreen from '../screens/tab/DoctorHomeScreen';
import HospitalsScreen from '../screens/tab/HospitalsScreen';
import MessagesScreen from '../screens/tab/MessagesScreen';
import PatientHomeScreen from '../screens/tab/PatientHomeScreen';
import { selectSignInAsDoctor } from '../store/reducers/user-mode';
import { useAppSelector } from '../store/types';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTab: FC = () => {
  const signInAsDoctor = useAppSelector(selectSignInAsDoctor);
  return (
    <Tab.Navigator
      tabBar={AppBottomTabBar}
      tabBarOptions={{
        activeTintColor: Colors.Green2,
        inactiveTintColor: Colors.Grey4,
        labelStyle: { fontFamily: Fonts.NunitoSemiBold },
      }}>
      {signInAsDoctor ? (
        <Tab.Screen
          name="DoctorHomeScreen"
          component={DoctorHomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: (props) => (
              <MaterialCommunityIcons name="home-outline" size={24} color={props.color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="PatientHomeScreen"
          component={PatientHomeScreen}
          options={{
            tabBarLabel: 'Doctor',
            tabBarIcon: (props) => (
              <MaterialCommunityIcons name="face-outline" size={24} color={props.color} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={24}
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
            <MaterialCommunityIcons name="map-outline" size={24} color={props.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
