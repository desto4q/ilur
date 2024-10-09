import {View, InteractionManager} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import CarouselCard from '../../components/CarouselCard';
import {Carousel} from 'react-native-flash-carousel';
import {useGalleryContext} from '../../Context/MainGalleryContext';
import {AssetItem} from 'react-native-media-library2';

export default function MainImageScreen() {
  const {TabHomeData, currentRef} = useGalleryContext();
  let renderItem = useMemo(() => {
    return ({item}: {item: AssetItem}) => {
      return <CarouselCard item={item} />;
    };
  }, []);
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
