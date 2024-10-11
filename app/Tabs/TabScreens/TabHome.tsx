import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import MasonCard from '../../components/MasonCard';
import {tw} from '../../utils/utils';
import {AssetItem} from 'react-native-media-library2';
import {useGalleryContext} from '../../Context/MainGalleryContext';
import {RefreshControl} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import {useSelectedStore} from '../../store/zus';
import MainHeader from '../../components/MainHeader';
let renderItem = ({item, index}: {item: AssetItem; index: number}) => {
  return <MasonCard item={item} index={index} />;
};
export default function TabHome() {
  let {TabHomeData, isFetching, refetch} = useGalleryContext();
  let clear = useSelectedStore(state => state.clear);
  let {selectMode} = useGalleryContext();
  let isFocused = useIsFocused();
  useEffect(() => {
    clear();
  }, [isFocused]);
  return (
    <View style={{flex: 1}}>
      <MainHeader />
      <FlashList
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        data={TabHomeData}
        renderItem={renderItem}
        numColumns={4}
        estimatedItemSize={70}
      />
      {isFetching ? (
        <View
          style={tw(
            'absolute flex-1 w-full top-0  bottom-0 self-center my-auto  left-0 justify-center items-center',
          )}>
          <View style={tw('bg-neutral-700 p-4 rounded-md')}>
            <Text style={tw('text-xl')}>MediaLibrary is loading</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
