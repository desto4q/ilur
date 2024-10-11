import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNav from '../Tabs/TabNav';
import MainImageScreen from './Screens/MainImageScreen';
import CollectionsScreen from './Screens/CollectionsScreen';
import CollectionImageScreen from './Screens/CollectionImageScreen';
import MainHeader from '../components/MainHeader';
import FavoritesScreen from './Screens/FavoritesScreen';
let Stack = createNativeStackNavigator();
export default function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationDuration: 500,
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen component={TabNav} name="Tab" />
      <Stack.Screen component={MainImageScreen} name="MainImageScreen" />
      <Stack.Screen component={CollectionsScreen} name="CollectionsScreen" />
      <Stack.Screen
        component={CollectionImageScreen}
        name="CollectionImageScreen"
      />
      <Stack.Screen component={FavoritesScreen} name='FavScreen'/>
    </Stack.Navigator>
  );
}
