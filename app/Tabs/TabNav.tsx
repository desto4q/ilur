import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabHome from './TabScreens/TabHome';
import TabCollection from './TabScreens/TabCollection';
import CustomTabBar from '../components/CustomTabBar';
import TabFavorites from './TabScreens/TabFavorites';

let Tab = createBottomTabNavigator();
export default function TabNav() {
  return (
    <Tab.Navigator  
      tabBar={e => <CustomTabBar {...e} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen component={TabHome} name="TabHome" />
      <Tab.Screen
        component={TabCollection}
        name="TabCol"
        options={{
          headerTitle: 'Collections',
        }}
      />
      <Tab.Screen
        component={TabFavorites}
        name="TabFav"
        options={{
          headerTitle: 'Favorites',
        }}
      />
    </Tab.Navigator>
  );
}
