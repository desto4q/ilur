import {View, Text, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {tw} from '../../utils/utils';
import {Modalize} from 'react-native-modalize';
import {useGalleryContext} from '../../Context/MainGalleryContext';
import {useSelectedStore} from '../../store/zus';
import {createCollection} from '../../store/storage';

export default function TabFavorites() {
  let {TabHomeData} = useGalleryContext();
  const modalizeRef = useRef<Modalize>(null);
  let items = useSelectedStore(state => state.selectedItems);
  let count = Object.keys(items).length;
  let clear = useSelectedStore(state => state.clear);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={tw('p-2')}
        onPress={() => {
          createCollection('love', []);
        }}>
        <Text>Open Modal</Text>
      </TouchableOpacity>
      <Text>Welcome to React Native!</Text>
      <Text>To get started, edit App.js</Text>
      <Text>{JSON.stringify(count)}</Text>
    </View>
  );
}
