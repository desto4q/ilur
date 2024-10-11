import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AssetItem} from 'react-native-media-library2';
import {colors, tw} from '../utils/utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useGalleryContext} from '../Context/MainGalleryContext';
import {Camera, Play} from 'lucide-react-native';
import {useSelectedStore} from '../store/zus';
interface AssetItemExtend {
  item: AssetItem;
  index: number;
}
import {useIsFocused} from '@react-navigation/native';


export default function MasonCard({item, index}: AssetItemExtend) {
  let navigation: any = useNavigation();
  let addTo = useSelectedStore(state => state.addToSelected);
  let remove = useSelectedStore(state => state.removeFromSelected);
  let [selected, setSelected] = useState(false);
  const isFocused = useIsFocused();
  let {selectMode, currentRef} = useGalleryContext();
  useEffect(() => {
    if (selected) {
      setSelected(false);
    }
  }, [isFocused]);
  const onClick = async () => {
    if (selectMode.current) {
      selecter();
      return;
    }

    currentRef.current = index;
    navigation.navigate('MainImageScreen', {
      index: index,
    });
  };
  const onLongPress = async () => {
    selecter();
    if (!selectMode.current) {
      selectMode.current = true;
    }
  };

  let selecter = () => {
    if (selected) {
      remove(item.id);
      setSelected(!selected);
      return;
    }
    addTo(item);
    setSelected(!selected);
  };

  return (
    <View style={tw('w-full aspect-square  rounded-md p-[2px] relative')}>
      <TouchableOpacity
        onLongPress={onLongPress}
        onPress={() => {
          onClick();
        }}
        style={[{flex: 1, position: 'relative'}]}>
        <View
          style={tw(
            `h-full w-full absolute bg-red-200 z-10 left-0 top-0 bottom-1 ${
              !selected ? 'bg-opacity-0' : 'bg-opacity-100'
            }`,
          )}></View>

        <Image
          style={{
            flex: 1,
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
