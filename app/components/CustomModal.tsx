import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Button,
} from 'react-native';
import React, {useState, useEffect, RefObject} from 'react';
import {Modalize} from 'react-native-modalize';
import {useModalContext} from '../Context/ModalContext';
import {AssetItem} from 'react-native-media-library2';
import {tw} from '../utils/utils';
import {tempItems, useIndexStore, useSelectedStore} from '../store/zus';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {useQuery} from '@tanstack/react-query';
import {getAllCollections, updateCollection} from '../store/storage';
import {FlashList} from '@shopify/flash-list';

let renderItem = ({item}: {item: string}) => {
  return <ColCard title={item} />;
};

const CustomModal = () => {
  const {modalizeRef} = useModalContext();
  let items = useSelectedStore(state => state.selectedItems);
  let [name, setName] = useState('');
  let {data, refetch} = useQuery({
    queryKey: ['savedCols'],
    queryFn: async () => await getAllCollections(),
  });

  let dimen = useWindowDimensions();
  return (
    <Modalize
      avoidKeyboardLikeIOS
      ref={modalizeRef}
      customRenderer={
        <Animated.View style={tw('flex-1 bg-neutral-900')}>
          <Text style={tw('')}>{JSON.stringify(items)}</Text>
          <Text>{JSON.stringify(data)}</Text>
          <TouchableOpacity
            style={tw('p-2')}
            onPress={() => {
              refetch();
            }}>
            <Text>refetc</Text>
          </TouchableOpacity>
          <FlashList
            data={data}
            numColumns={2}
            renderItem={renderItem}
            estimatedItemSize={24}
          />
        </Animated.View>
      }
    />
  );
};
let ColCard = ({title}: {title: string}) => {
  let items = useSelectedStore(state => state.selectedItems);
  let {modalizeRef} = useModalContext();
  let onPress = async () => {
    let arr = Object.values(items);
    try {
      await updateCollection(title, arr);
      Alert.alert('Saved', 'Saved to ' + title, [
        { text: 'Close', onPress: () => console.log('Close Pressed') }
      ])
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw(
        'bg-neutral-800 border border-neutral-700 h-12 items-center justify-center px-2 rounded-md',
      )}>
      <View style={tw('justify-center items-center')}>
        <Text style={tw('text-lg')}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomModal;
