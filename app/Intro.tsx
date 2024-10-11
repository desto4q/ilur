import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Main from './Main';
import {
  GalleryContextProvider,
  useGalleryContext,
} from './Context/MainGalleryContext';
import {ModalContextProvider} from './Context/ModalContext';
import {selectModeAtom, useSelectedStore} from './store/zus';
import {useAtom} from 'jotai';
enableScreens();
const queryClient = new QueryClient();
export default function Intro() {
  let clear = useSelectedStore(state => state.clear);
  useEffect(() => {
    clear();
  }, []);
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
