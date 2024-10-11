import {View, Text, Animated} from 'react-native';
import React, {useState, useEffect, RefObject} from 'react';
import {Modalize} from 'react-native-modalize';
import {useModalContext} from '../Context/ModalContext';
import {AssetItem} from 'react-native-media-library2';
import {tw} from '../utils/utils';
import {tempItems, useIndexStore} from '../store/zus';

const CustomModal = ({items}: {items?: AssetItem[]}) => {
  const {modalizeRef} = useModalContext();
  const temp = tempItems.items.get();
  let add;
  let [name, setName] = useState('');
  return (
    <Modalize
      avoidKeyboardLikeIOS
      ref={modalizeRef}
      customRenderer={
        <Animated.View style={{flex: 1, backgroundColor: 'red'}}>
          <Text style={tw('')}>{JSON.stringify(temp)}</Text>
        </Animated.View>
      }
    />
  );
};

export default CustomModal;
