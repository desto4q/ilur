import React, {useEffect, useCallback} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import StackNav from './StackNav/StackNav';
import {useSelectedStore} from './store/zus';
import {useGalleryContext} from './Context/MainGalleryContext';

export default function Main() {
  const items = useSelectedStore(state => state.selectedItems);
  const {selectMode} = useGalleryContext();
  return (
    <NavigationContainer theme={DarkTheme}>
      <StackNav />
    </NavigationContainer>
  );
}
