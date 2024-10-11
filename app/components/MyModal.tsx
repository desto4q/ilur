import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {tw} from '../utils/utils';
import {FlashList} from '@shopify/flash-list';
import {useGalleryContext} from '../Context/MainGalleryContext';
import CarouselCard from './CarouselCard';
import {AssetItem} from 'react-native-media-library2';

let {width} = Dimensions.get('screen');
let renderItem = ({item}: {item: AssetItem}) => {
  return <CarouselCard item={item} />;
};
export default function MyModal() {
  let {TabHomeData, currentRef} = useGalleryContext();
  return (
    <View
      style={[
        tw('flex-1  p-2 h-full bg-red-200'),
        {
          width: width,
        },
      ]}>
      <FlashList
        data={TabHomeData}
        horizontal
        renderItem={renderItem}
        estimatedItemSize={width}
        pagingEnabled
        
      />
    </View>
  );
}
