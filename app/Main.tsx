import React, {useEffect, useCallback} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import StackNav from './StackNav/StackNav';
import {useSelectedStore} from './store/zus';
import {useGalleryContext} from './Context/MainGalleryContext';

export default function Main() {
  const items = useSelectedStore(state => state.selectedItems);
  const {selectMode} = useGalleryContext();

  const resetSelectMode = useCallback(() => {
    if (Object.keys(items).length < 1) {
      selectMode.current = false;
    }
  }, [items, selectMode]);

  useEffect(() => {
    resetSelectMode();
  }, [items, resetSelectMode]);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StackNav />
    </NavigationContainer>
  );
}
