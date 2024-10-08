import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import TabNav from './Tabs/TabNav';
import StackNav from './StackNav/StackNav';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as MediaLibrary from 'expo-media-library';
import {GalleryContextProvider} from './Context/MainGalleryContext';
let client = new QueryClient();

export default function Main() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StackNav />
    </NavigationContainer>
  );
}
