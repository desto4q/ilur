import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Main from './app/Main';
import {mediaLibrary} from 'react-native-media-library2';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GalleryContextProvider} from './app/Context/MainGalleryContext';
// enableScreens();

let queryClient = new QueryClient();
export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient} >
        <GalleryContextProvider >
          <Main />
        </GalleryContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
