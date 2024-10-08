import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AssetItem} from 'react-native-media-library2';
import {Carousel} from 'react-native-flash-carousel';
import CarouselCard from '../../components/CarouselCard';
import {InteractionManager} from 'react-native';
import {tw} from '../../utils/utils';

interface params {
  data: AssetItem[];
  index: number;
}

let renderItem = ({item}: {item: AssetItem}) => {
  return <CarouselCard item={item} />;
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
      {isTransitionComplete ? (
        <Carousel
          data={params.data}
          renderItem={renderItem}
          initialScrollIndex={params.index}
        />
      ) : (
        <View style={tw('flex-1 bg-neutral-600')} />
      )}
    </View>
  );
}
