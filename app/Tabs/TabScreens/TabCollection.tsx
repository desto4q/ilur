import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getCollections, getSingle} from '../../api/galleryMethods';
import {FlashList} from '@shopify/flash-list';
import * as MediaLibrary from 'expo-media-library';
import {tw} from '../../utils/utils';
import CollectionCard from '../../components/CollectionCard';
let dmen = Dimensions.get('window');

let renderItem = ({item}: {item: MediaLibrary.Album}) => {
  return <CollectionCard item={item} />;
};
export default function TabCollection() {
  let {data} = useQuery({
    queryKey: ['collections'],
    queryFn: async () => await getCollections(),
  });

  return (
    <View style={{flex: 1}}>
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <FlashList
        // style={tw("bg-red-200")}
        numColumns={2}
        data={data}
        renderItem={renderItem}
        estimatedItemSize={dmen.width / 2}
      />
    </View>
  );
}
