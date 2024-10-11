import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getCollections, getSingle} from '../../api/galleryMethods';
import {FlashList} from '@shopify/flash-list';
import * as MediaLibrary from 'expo-media-library';
import {tw} from '../../utils/utils';
import CollectionCard from '../../components/CollectionCard';
import {RefreshControl} from 'react-native-gesture-handler';
import MainHeader from '../../components/MainHeader';
let dmen = Dimensions.get('window');

let renderItem = ({item}: {item: MediaLibrary.Album}) => {
  return <CollectionCard item={item} />;
};
export default function TabCollection() {
  let {data, isFetching, refetch} = useQuery({
    queryKey: ['collections'],
    queryFn: async () => await getCollections(),
  });

  return (
    <View style={{flex: 1}}>
      <MainHeader title="Collections" />
      <FlashList
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        numColumns={2}
        data={data}
        renderItem={renderItem}
        estimatedItemSize={dmen.width / 2}
      />
      {isFetching ? (
        <View
          style={tw(
            'absolute flex-1 w-full top-0  bottom-0 self-center my-auto  left-0 justify-center items-center',
          )}>
          <View style={tw('bg-neutral-700 p-4 rounded-md')}>
            <Text style={tw('text-xl')}>Collections is loading</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
