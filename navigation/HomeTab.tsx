import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReadonlyDeep } from 'type-fest';

import AppBottomTabBar from '../components/molecules/AppTabBar';
import Colors from '../constants/colors';
import DoctorHomeScreen from '../screens/tab/DoctorHomeScreen';
import HospitalsScreen from '../screens/tab/HospitalsScreen';
import MessagesScreen from '../screens/tab/MessagesScreen';
import PatientHomeScreen from '../screens/tab/PatientHomeScreen';
import { selectSignInAsDoctor } from '../store/reducers/user-mode';
import { useAppSelector } from '../store/types';

export type HomeTabParamList = ReadonlyDeep<{
  PatientHomeScreen: undefined;
  DoctorHomeScreen: undefined;
  MessagesScreen: undefined;
  HospitalsScreen: undefined;
}>;

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTab() {
  const signInAsDoctor = useAppSelector(selectSignInAsDoctor);

  return (
    <Tab.Navigator
      tabBar={AppBottomTabBar}
      tabBarOptions={{
        activeTintColor: Colors.Green2,
        inactiveTintColor: Colors.Grey4,
        labelStyle: { fontFamily: 'Nunito_600SemiBold' },
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
}
