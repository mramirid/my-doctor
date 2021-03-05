import { AntDesign } from '@expo/vector-icons';
import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../../constants/colors';
import AppTabItem from '../atoms/tab/AppTabItem';

const AppTabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = (props) => {
  const focusedOptions = props.descriptors[props.state.routes[props.state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {props.state.routes.map((route, index) => {
        const isFocused = props.state.index === index;
        const { options } = props.descriptors[route.key];
        const tabItemColor =
          (isFocused ? props.activeTintColor : props.inactiveTintColor) ?? Colors.Grey3;

        const label = options.tabBarLabel
          ? options.tabBarLabel
          : options.title
          ? options.title
          : route.name;

        let icon: React.ReactNode;
        if (options.tabBarIcon) {
          icon = options.tabBarIcon({
            focused: isFocused,
            color: tabItemColor,
            size: 23,
          });
        } else {
          icon = <AntDesign name="questioncircleo" size={24} color={tabItemColor} />;
        }

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          props.navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <AppTabItem
            key={index}
            icon={icon}
            label={label}
            tabItemColor={tabItemColor}
            accessibilityRole="tab"
            accessibilityState={isFocused ? { selected: true } : undefined}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.Dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AppTabBar;
