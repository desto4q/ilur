import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import {colors, tw} from '../utils/utils';
import {useSelectedStore} from '../store/zus';
import {useShallow} from 'zustand/shallow';
import {DeleteIcon, PlusCircle} from 'lucide-react-native';
import {useModalContext} from '../Context/ModalContext';
import {AssetItem} from 'react-native-media-library2';
import {DeleteFromCol} from '../store/storage';

export default function FavHeader({
  title,
  favData,
  refetch,
}: {
  title?: string;
  favData: AssetItem[];
  refetch: () => any;
}) {
  let items = useSelectedStore(useShallow(state => state.selectedItems));
  let clear = useSelectedStore(state=>state.clear)
  let count = useMemo(() => {
    return Object.keys(items).length;
  }, [items]);
  let {openModal} = useModalContext();
  let onPress = () => {
    openModal();
  };
  let filter = async () => {
    let filtered = favData.filter(item => !items[item.id]); // Filter out items whose id exists in selectedItems
    console.log(filtered);
    await DeleteFromCol(String(title), filtered);
    await refetch()
    clear()
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
      {count > 0 ? (
        <View
          style={tw(
            'absolute left-0 right-0 z-10 bg-neutral-900 h-full flex-row items-center px-2',
          )}>
          <Text style={tw('text-lg')}>Selected:{count}</Text>
          <TouchableOpacity
            onPress={filter}
            style={tw('h-full p-2 items-center justify-center ml-auto')}>
            <DeleteIcon size={20} color={colors.neutral[200]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPress}
            style={tw('h-full p-2 items-center justify-center ml-2')}>
            <PlusCircle size={20} color={colors.neutral[200]} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
