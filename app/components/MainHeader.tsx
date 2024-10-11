import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {colors, tw} from '../utils/utils';
import {selectModeAtom, selectState$, useSelectedStore} from '../store/zus';
import {useShallow} from 'zustand/shallow';
import {PlusCircle, X} from 'lucide-react-native';
import {useModalContext} from '../Context/ModalContext';
import {useGalleryContext} from '../Context/MainGalleryContext';
import {observer} from '@legendapp/state/react';
import {useSharedRef} from '../Context/SharedRefContext';
import {useAtomValue, useSetAtom} from 'jotai';

let MainHeader = observer(function MainHeader({title}: {title?: string}) {
  let items = useSelectedStore(useShallow(state => state.selectedItems));
  let clear = useSelectedStore(state => state.clear);
  let count = useMemo(() => {
    return Object.keys(items).length;
  }, [items]);
  let {openModal} = useModalContext();
  let onPress = () => {
    openModal();
  };
  let selectMode = useAtomValue(selectModeAtom);
  let setSelectMode = useSetAtom(selectModeAtom);
  let sharedVarRef = useSharedRef();

  let reset = async () => {
    await clear();
    sharedVarRef.current == false;
    setSelectMode(false);
  };
  

  return (
    <View style={tw('h-14 items-center bg-neutral-900 relative flex-row px-2')}>
      <Text style={tw('text-xl ')}>Ilur</Text>
      {title ? (
        <Text
          style={tw('text-xl ml-auto max-w-3/4 text-right')}
          numberOfLines={1}>
          {title}
        </Text>
      ) : null}
      {selectMode ? (
        <View
          style={tw(
            'absolute left-0 right-0 z-10 bg-neutral-900 h-full flex-row items-center px-2',
          )}>
          <TouchableOpacity
            style={tw('p-2 bg-neutral-600 rounded-md mr-2')}
            onPress={reset}>
            <X size={16} color={'white'} />
          </TouchableOpacity>
          <Text style={tw('text-lg')}>Selected:{count}</Text>
          <TouchableOpacity
            onPress={onPress}
            style={tw('h-full p-2 items-center justify-center ml-auto')}>
            <PlusCircle size={20} color={colors.neutral[200]} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
});

export default MainHeader;
