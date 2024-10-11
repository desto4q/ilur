import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import {AssetItem} from 'react-native-media-library2';
type screenWidth = number;

export default function VideoCard({
  item,
  screenWidth,
}: {
  item: AssetItem;
  screenWidth: screenWidth;
}) {
  const date = new Date(Number(item.modificationTime));
  return (
    <View style={{height: '100%', width: screenWidth}}>
      <Video
        source={{uri: item.uri}}
        style={{
          height: '100%',
          width: screenWidth,
        }}
        controls
        paused
      />
    </View>
  );
}
