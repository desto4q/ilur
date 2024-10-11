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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FasterImageView} from '@candlefinance/faster-image';
import {useGalleryContext} from '../Context/MainGalleryContext';
// import {IconPlayerPlay} from '@tabler/icons-react-native';
import {Camera, Play} from 'lucide-react-native';
import {useSelectedStore} from '../store/zus';

interface AssetItemExtend {
  item: AssetItem;
  index: number;
  data?: AssetItem[];
}
export default function CollectionMasonCard({
  item,
  index,
  data,
}: AssetItemExtend) {
  let navigation: any = useNavigation();
  const onClick = async () => {
    if (selectMode.current) {
      selecter();
      return;
    }
    navigation.navigate('CollectionImageScreen', {
      index: index,
      data: data,
    });
  };

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
        onPress={() => {
          onClick();
        }}
        onLongPress={onLongPress}
        style={{
          flex: 1,
          position: 'relative',
        }}>
        <View
          style={tw(
            `h-full w-full absolute bg-red-200 z-10 left-0 top-0 bottom-1 ${
              !selected ? 'bg-opacity-0' : 'bg-opacity-100'
            }`,
          )}></View>
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
