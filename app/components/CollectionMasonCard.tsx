import {
  View,
  Text,
  TouchableOpacity,
  LayoutChangeEvent,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {AssetItem} from 'react-native-media-library2';
import {colors, tw} from '../utils/utils';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FasterImageView} from '@candlefinance/faster-image';
import {useGalleryContext} from '../Context/MainGalleryContext';
// import {IconPlayerPlay} from '@tabler/icons-react-native';
import {Camera, Play} from 'lucide-react-native';
import {selectState$, useSelectedStore} from '../store/zus';
import { observer } from '@legendapp/state/react';

interface AssetItemExtend {
  item: AssetItem;
  index: number;
  data?: AssetItem[];
}
let CollectionMasonCard=  observer(function CollectionMasonCard({item, index, data}: AssetItemExtend) {
  let navigation: any = useNavigation();

  let addTo = useSelectedStore(state => state.addToSelected);
  let remove = useSelectedStore(state => state.removeFromSelected);
  let [selected, setSelected] = useState(false);
  let selectMode = selectState$.get();
  useEffect(() => {
    if (!selectMode && selected) {
      setSelected(false);
    }
  }, [selectMode, selected]);

  const onClick = useCallback(() => {
    if (selectMode) {
      selecter();
      return;
    }
    navigation.navigate('CollectionImageScreen', {
      index: index,
      data: data,
    });
  }, [selectMode, selected]);

  const onLongPress = useCallback(() => {
    selectState$.set(true);
    selecter();
  }, [selected]);

  const selecter = useCallback(() => {
    if (selected) {
      remove(item.id);
      setSelected(false);
    } else {
      addTo(item);
      setSelected(true);
    }
  }, [selected, item]);

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
});
export default CollectionMasonCard;
