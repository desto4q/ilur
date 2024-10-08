import React, {useRef} from 'react';
import {View, Animated, StyleSheet, Image} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {tw} from '../utils/utils';
import {AssetItem} from 'react-native-media-library2';
const PinchToZoom = (item: AssetItem) => {
  return (
    <Image
      style={{
        width: '100%',
        height: '100%',
      }}
      source={{uri: item.uri}}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PinchToZoom;
