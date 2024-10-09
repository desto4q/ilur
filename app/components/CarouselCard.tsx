import {View, Text, useWindowDimensions} from 'react-native';
import React, {RefObject, useEffect, useRef} from 'react';
import {ImageZoom, Zoomable} from '@likashefqet/react-native-image-zoom';
import Zoom from 'react-native-zoom-reanimated';

import {AssetItem, mediaLibrary} from 'react-native-media-library2';
import Video, {VideoRef} from 'react-native-video';
import {tw} from '../utils/utils';
import {useGalleryContext} from '../Context/MainGalleryContext';
export default function CarouselCard({item}: {item: AssetItem}) {
  let dmen = useWindowDimensions();
  const date = new Date(Number(item.modificationTime));

  return (
    <View style={{height: '100%', width: dmen.width}}>
      <View style={tw('absolute z-10 bg-neutral-800 w-full p-2 bg-opacity-75')}>
        <Text numberOfLines={1}>{item.filename}</Text>
        <View style={tw('flex-row gap-4')}>
          <Text>{date.toLocaleString()}</Text>
          {item.mediaType == 'video' ?? <Text>{item.duration}</Text>}
        </View>
      </View>
      {item.mediaType == 'photo' ? (
        <ImageZoom isDoubleTapEnabled uri={item.uri} style={{}} />
      ) : (
        <Video
          source={{uri: item.uri}}
          style={{
            height: '100%',
            width: dmen.width,
          }}
          controls
          paused
        />
      )}
    </View>
  );
}
