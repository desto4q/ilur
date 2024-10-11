import {View, Text, Dimensions} from 'react-native';
import React, {useMemo} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useQueries, useQuery} from '@tanstack/react-query';
import {getCollection} from '../../store/storage';
import {FlashList} from '@shopify/flash-list';
import {tw} from '../../utils/utils';
import CollectionMasonCard from '../../components/CollectionMasonCard';
import {AssetItem} from 'react-native-media-library2';
import MainHeader from '../../components/MainHeader';
import FavHeader from '../../components/FavHeader';
import {useSelectedStore} from '../../store/zus';

interface RouteParams {
  key: string;
}
let dmen = Dimensions.get('screen');

export default function FavoritesScreen() {
  const {params} = useRoute<RouteProp<{params: RouteParams}, 'params'>>();

  let {data, refetch} = useQuery({
    queryKey: ['fav', params.key],
    queryFn: async () => getCollection(params.key),
  });
  let selectedItems = useSelectedStore(state => state.selectedItems);
  let renderItem = useMemo(() => {
    return ({item, index}: {item: AssetItem; index: number}) => {
      return <CollectionMasonCard index={index} item={item} data={data} />;
    };
  }, [data,selectedItems]);
  return (
    <View style={tw('flex-1')}>
      {/* <MainHeader title={params.key} /> */}
      <FavHeader favData={data} title={params.key} refetch={refetch} />
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <FlashList
        data={data}
        renderItem={renderItem}
        numColumns={4}
        extraData={selectedItems}
        estimatedItemSize={dmen.width / 4}
      />
    </View>
  );
}
