import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {ImageZoom, Zoomable} from '@likashefqet/react-native-image-zoom';
import Zoom from 'react-native-zoom-reanimated';

import {AssetItem, mediaLibrary} from 'react-native-media-library2';
import Video from 'react-native-video';
import {tw} from '../utils/utils';

export default function CarouselCard({item}: {item: AssetItem}) {
  let dmen = useWindowDimensions();
  return (
    <View style={{height: '100%', width: dmen.width, backgroundColor: 'blue'}}>
      {item.mediaType == 'photo' ? (
        <ImageZoom
          isDoubleTapEnabled
          uri={item.uri}
          style={{
            backgroundColor: 'red',
          }}
        />
      ) : (
        <Zoomable style={{flex: 1}} isDoubleTapEnabled>
          <Video
            source={{uri: item.uri}}
            style={{
              height: '100%',
              width: dmen.width,
            }}
            controls
            paused
          />
        </Zoomable>
      )}
    </View>
  );
}
