import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabHome from './TabScreens/TabHome';
import TabCollection from './TabScreens/TabCollection';
let Tab = createBottomTabNavigator();
export default function TabNav() {
  return (
    <Tab.Navigator >
      <Tab.Screen component={TabHome} name="TabHome" />
      <Tab.Screen component={TabCollection} name="TabCol" />
    </Tab.Navigator>
  );
}
