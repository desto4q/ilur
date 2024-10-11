import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {AssetItem} from 'react-native-media-library2';
import {colors, tw} from '../utils/utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Play} from 'lucide-react-native';
import {selectModeAtom, selectState$, useSelectedStore} from '../store/zus';
import {observer} from '@legendapp/state/react';
import {useGalleryContext} from '../Context/MainGalleryContext';
import {useSharedRef} from '../Context/SharedRefContext';
import {useAtomValue, useSetAtom} from 'jotai';

interface AssetItemExtend {
  item: AssetItem;
  index: number;
}

const MasonCard = forwardRef(({item, index}: AssetItemExtend, ref) => {
  const navigation = useNavigation();
  const addTo = useSelectedStore(state => state.addToSelected);
  const remove = useSelectedStore(state => state.removeFromSelected);
  const {currentRef} = useGalleryContext();
  const [selected, setSelected] = useState(false);
  const sharedVarRef = useSharedRef();
  const setSelectMode = useSetAtom(selectModeAtom);

  const onClick = () => {
    if (sharedVarRef.current) {
      selecter();
      return;
    }
    currentRef.current = index;
    navigation.navigate('MainImageScreen', {
      index: index,
    });
  };

  const onLongPress = () => {
    setSelectMode(true);
    selecter();
  };

  const selecter = () => {
    if (selected) {
      remove(item.id);
      setSelected(false);
    } else {
      addTo(item);
      setSelected(true);
    }
  };
  let resetSelection = () => {
    if (selected) {
      setSelectMode(selected);
    }
  };
  useImperativeHandle(ref, () => ({
    resetSelection
  }));

  return (
    <View style={tw('w-full aspect-square rounded-md p-[2px] relative')}>
      <TouchableOpacity
        onLongPress={onLongPress}
        onPress={onClick}
        style={[{flex: 1, position: 'relative'}]}>
        <View
          style={tw(
            `h-full w-full absolute bg-red-200 z-10 left-0 top-0 bottom-1 ${
              !selected ? 'bg-opacity-0' : 'bg-opacity-80'
            }`,
          )}
        />
        <Image
          style={{flex: 1, resizeMode: 'cover'}}
          source={{uri: item.uri}}
        />
        {item.mediaType === 'video' && (
          <View
            style={tw('absolute w-full h-full items-center justify-center')}>
            <View
              style={tw(
                'bg-neutral-200 bg-opacity-80 rounded-full aspect-square p-2',
              )}>
              <Play color={colors.neutral[900]} size={22} />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
});

export default MasonCard;
