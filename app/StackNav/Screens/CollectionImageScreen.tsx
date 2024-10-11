import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AssetItem} from 'react-native-media-library2';
import {Carousel} from 'react-native-flash-carousel';
import CarouselCard from '../../components/CarouselCard';
import {InteractionManager} from 'react-native';
import {tw} from '../../utils/utils';
import {FlashList} from '@shopify/flash-list';
import VideoCard from '../../components/VideoCard';
import AppHeader from '../../components/AppHeader';

interface params {
  data: AssetItem[];
  index: number;
}
let {width} = Dimensions.get('screen');

let renderItem = ({item}: {item: AssetItem}) => {
  switch (item.mediaType) {
    case 'video':
      return <VideoCard item={item} screenWidth={width} />;
    default:
      return <CarouselCard item={item} screenWidth={width} />;
  }
};

export default function CollectionImageScreen() {
  let {params} = useRoute<RouteProp<{params: params}>>();
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      setIsTransitionComplete(true);
    });

    return () => interaction.cancel();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlashList
        pagingEnabled
        decelerationRate={'fast'}
        directionalLockEnabled={true}
        pinchGestureEnabled={false}
        data={params.data}
        renderItem={renderItem}
        initialScrollIndex={params.index}
        estimatedItemSize={width}
        horizontal
        getItemType={item => item.mediaType}
      />
    </View>
  );
}
