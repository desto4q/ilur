import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import MasonCard from '../../components/MasonCard';
import {tw} from '../../utils/utils';
import {AssetItem} from 'react-native-media-library2';
import {useGalleryContext} from '../../Context/MainGalleryContext';
import {RefreshControl} from 'react-native-gesture-handler';
let renderItem = ({item, index}: {item: AssetItem; index: number}) => {
  return <MasonCard item={item} index={index} />;
};
export default function TabHome() {
  let {TabHomeData, isFetching, refetch} = useGalleryContext();
  return (
    <View style={{flex: 1}}>
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
