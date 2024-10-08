import { View, InteractionManager } from 'react-native';
import React, { useEffect, useState } from 'react';
import CarouselCard from '../../components/CarouselCard';
import { Carousel } from 'react-native-flash-carousel';
import { useGalleryContext } from '../../Context/MainGalleryContext';
import { AssetItem } from 'react-native-media-library2';
import { tw } from '../../utils/utils';

let renderItem = ({ item }: { item: AssetItem }) => {
  return <CarouselCard item={item} />;
};

export default function MainImageScreen() {
  const { TabHomeData, currentRef } = useGalleryContext();
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      setIsTransitionComplete(true);
    });

    return () => {
      interaction.cancel(); // Cleanup the interaction if the component unmounts
    };
  }, []); // Ensure the dependency array is empty to run this effect only once

  return (
    <View style={{ flex: 1, minHeight: 100 }}>
      {!isTransitionComplete ? (
        // You might want to render a loading state here if desired
        <View style={tw('flex-1 items-center justify-center bg-neutral-600')}>
          {/* Optional: A loading indicator can go here */}
        </View>
      ) : (
        <Carousel
          data={TabHomeData}
          renderItem={renderItem}
          initialScrollIndex={currentRef.current}
        />
      )}
    </View>
  );
}
