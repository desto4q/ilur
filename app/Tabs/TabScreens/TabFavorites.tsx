import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {tw} from '../../utils/utils';
import {Modalize} from 'react-native-modalize';
import {useGalleryContext} from '../../Context/MainGalleryContext';
import {useSelectedStore} from '../../store/zus';
import {createCollection, getAllCollections} from '../../store/storage';
import {useQuery} from '@tanstack/react-query';
import {FlashList} from '@shopify/flash-list';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';
import {useSharedRef} from '../../Context/SharedRefContext';

let dmen = Dimensions.get('window');
let renderItem = ({item}: {item: string}) => {
  return <Pill item={item} />;
};
export default function TabFavorites() {
  let {TabHomeData} = useGalleryContext();
  const modalizeRef = useRef<Modalize>(null);
  let items = useSelectedStore(state => state.selectedItems);
  let count = Object.keys(items).length;
  let clear = useSelectedStore(state => state.clear);
  let {data, refetch} = useQuery({
    queryKey: ['FavCol'],
    queryFn: async () => getAllCollections(),
  });
  let fetchAgain = async () => {
    let resp = await refetch();
  };
  useFocusEffect(
    useCallback(() => {
      fetchAgain();
    }, []),
  );
  let sharedVarRef = useSharedRef();
  return (
    <View style={{flex: 1}}>
      <AppHeader />
      <TouchableOpacity
        style={tw('p-2 bg-neutral-700')}
        onPress={() => {
          let prev = sharedVarRef.current;
          sharedVarRef.current = !prev;
        }}>
        <Text>dum</Text>
      </TouchableOpacity>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={28}
        contentContainerStyle={tw('px-2 ')}
      />
    </View>
  );
}

let Pill = ({item}: {item: string}) => {
  let navigation = useNavigation();

  return (
    <TouchableOpacity
      style={tw(
        'p-2 rounded-md  bg-neutral-800 border border-neutral-700 my-1 w-full ',
      )}
      onPress={() => {
        navigation.navigate('FavScreen', {
          key: item,
        });
      }}>
      <Text style={tw('text-xl')} numberOfLines={1}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};
