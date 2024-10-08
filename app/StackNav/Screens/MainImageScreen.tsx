import {View, Text} from 'react-native';
import React from 'react';
import CarouselCard from '../../components/CarouselCard';
import {Carousel} from 'react-native-flash-carousel';
import {useGalleryContext} from '../../Context/MainGalleryContext';
import {AssetItem} from 'react-native-media-library2';
let renderItem = ({item}: {item: AssetItem}) => {
  return <CarouselCard item={item} />;
};
export default function MainImageScreen() {
  let {TabHomeData, currentRef} = useGalleryContext();
  return (
    <View style={{flex: 1, minHeight: 100}}>
        <Carousel
        data={TabHomeData}
        renderItem={renderItem}
        initialScrollIndex={currentRef.current}
      />
    </View>
  );
}
