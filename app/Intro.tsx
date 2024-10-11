import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Main from './Main';
import {GalleryContextProvider} from './Context/MainGalleryContext';
import {ModalContextProvider} from './Context/ModalContext';
const queryClient = new QueryClient();
export default function Intro() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <GalleryContextProvider>
          <ModalContextProvider>
            <Main />
          </ModalContextProvider>
        </GalleryContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
