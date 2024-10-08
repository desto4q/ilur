import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNav from '../Tabs/TabNav';
import MainImageScreen from './Screens/MainImageScreen';
import CollectionsScreen from './Screens/CollectionsScreen';
import CollectionImageScreen from './Screens/CollectionImageScreen';
let Stack = createNativeStackNavigator();
export default function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // freezeOnBlur: true,
        animationDuration: 500,
        animation: "slide_from_right",
      }}>
      <Stack.Screen component={TabNav} name="Tab" />
      <Stack.Screen component={MainImageScreen} name="MainImageScreen" />
      <Stack.Screen component={CollectionsScreen} name="CollectionsScreen" />
      <Stack.Screen
        component={CollectionImageScreen}
        name="CollectionImageScreen"
      />
    </Stack.Navigator>
  );
}
