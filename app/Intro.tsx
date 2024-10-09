import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Main from './Main';
import {GalleryContextProvider} from './Context/MainGalleryContext';
// enableScreens();
const queryClient = new QueryClient();
export default function Intro() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <GalleryContextProvider>
          <Main />
        </GalleryContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
