import {
  View,
  Text,
  TouchableOpacity,
  LayoutChangeEvent,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AssetItem} from 'react-native-media-library2';
import {colors, tw} from '../utils/utils';
import {useNavigation} from '@react-navigation/native';
import {FasterImageView} from '@candlefinance/faster-image';
import {useGalleryContext} from '../Context/MainGalleryContext';
// import {IconPlayerPlay} from '@tabler/icons-react-native';
import {Camera, Play} from 'lucide-react-native';

interface AssetItemExtend {
  item: AssetItem;
  index: number;
}
export default function MasonCard({item, index}: AssetItemExtend) {
  let navigation: any = useNavigation();
  let {setIndex, currentRef} = useGalleryContext();
  const onClick = async () => {
    currentRef.current = index;
    navigation.navigate('MainImageScreen', {
      index: index,
    });
  };

  return (
    <View style={tw('w-full aspect-square  rounded-md p-[2px] relative')}>
      <TouchableOpacity
        onPress={() => {
          onClick();
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          source={{uri: item.uri}}
        />
        <View
          style={tw('absolute  w-full h-full  items-center justify-center')}>
          {item.mediaType == 'video' ? (
            <View
              style={[
                tw(
                  'bg-neutral-200 bg-opacity-80 rounded-full aspect-square p-2',
                ),
                {},
              ]}>
              <Play color={colors.neutral[900]} size={22} />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}
