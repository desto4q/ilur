import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import {colors, tw} from '../utils/utils';
import {useSelectedStore} from '../store/zus';
import {useShallow} from 'zustand/shallow';
import {PlusCircle} from 'lucide-react-native';
import {useModalContext} from '../Context/ModalContext';

export default function MainHeader({title}: {title?: string}) {
  let items = useSelectedStore(useShallow(state => state.selectedItems));
  let count = useMemo(() => {
    return Object.keys(items).length;
  }, [items]);
  let {openModal} = useModalContext();
  let onPress = () => {
    openModal()
  };
  return (
    <View
      style={tw('h-14 items-center bg-neutral-900 relatives flex-row px-2')}>
      <Text style={tw('text-xl ')}>Ilur</Text>
      {title ? (
        <Text
          style={tw('text-xl ml-auto max-w-3/4 text-right')}
          numberOfLines={1}>
          {title}
        </Text>
      ) : null}
      {count > 0 ? (
        <View
          style={tw(
            'absolute left-0 right-0 z-10 bg-neutral-900 h-full flex-row items-center px-2',
          )}>
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
}
