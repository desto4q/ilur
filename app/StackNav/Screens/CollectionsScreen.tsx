import {View, Text, Image, useWindowDimensions} from 'react-native';
import React, {useMemo} from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {FlashList} from '@shopify/flash-list';
import {AssetItem} from 'react-native-media-library2';
import {getCollectionItems} from '../../api/galleryMethods';
import {tw} from '../../utils/utils';
import CollectionMasonCard from '../../components/CollectionMasonCard';

// Define the type for route parameters
type RouteParams = {
  collId: string;
};

export default function CollectionsScreen() {
  const {params} = useRoute<RouteProp<{params: RouteParams}, 'params'>>();

  const {data} = useQuery({
    queryKey: [params.collId],
    queryFn: async () => await getCollectionItems(params.collId),
  });
  let renderItem = useMemo(() => {
    return ({item, index}: {item: AssetItem; index: number}) => {
      return <CollectionMasonCard item={item} index={index} data={data} />;
    };
  }, [data]);
  let dmen = useWindowDimensions();
  return (
    <View style={{flex: 1}}>
      <Text>CollectionsScreen</Text>
      {/* <Text>{params.collId}</Text>
        <Text>{JSON.stringify(data)}</Text> */}
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={dmen.width / 4}
        numColumns={4}
      />
    </View>
  );
}
