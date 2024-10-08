import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import MasonCard from '../../components/MasonCard';
import {tw} from '../../utils/utils';
import {AssetItem} from 'react-native-media-library2';
import {useGalleryContext} from '../../Context/MainGalleryContext';
let renderItem = ({item, index}: {item: AssetItem; index: number}) => {
  return <MasonCard item={item} index={index} />;
};
export default function TabHome() {
  let {TabHomeData} = useGalleryContext();
  return (
    <View style={{flex: 1}}>
      <FlashList
        data={TabHomeData}
        renderItem={renderItem}
        numColumns={4}
        estimatedItemSize={70}
      />
    </View>
  );
}
