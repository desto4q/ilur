import React, {useEffect, useCallback} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import StackNav from './StackNav/StackNav';
import {selectModeAtom, useSelectedStore} from './store/zus';
import {useGalleryContext} from './Context/MainGalleryContext';
import {useAtomValue} from 'jotai';
import {useSharedRef} from './Context/SharedRefContext';

export default function Main() {
  const items = useSelectedStore(state => state.selectedItems);
  let selectMode = useAtomValue(selectModeAtom);
  let sharedVarRef = useSharedRef();
  useEffect(() => {
    sharedVarRef.current = selectMode;
  }, [selectMode]);
  return (
    <NavigationContainer theme={DarkTheme}>
      <StackNav />
    </NavigationContainer>
  );
}
