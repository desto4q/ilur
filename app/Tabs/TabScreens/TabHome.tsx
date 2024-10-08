import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
// import {AssetItem} from 'react-native-media-library2';
import {FlashList, MasonryFlashList} from '@shopify/flash-list';
import MasonCard from '../../components/MasonCard';
import {tw} from '../../utils/utils';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {getAll, getPhotos} from '../../api/galleryMethods';
import {ScrollView} from 'react-native-gesture-handler';
import {AssetItem} from 'react-native-media-library2';
import {useGalleryContext} from '../../Context/MainGalleryContext';
let renderItem = ({item, index}: {item: AssetItem; index: number}) => {
  return <MasonCard item={item} index={index} />;
};
export default function TabHome() {
  let {TabHomeData} = useGalleryContext();
  return (
    <View style={{flex: 1}}>
      {/* <ScrollView>
        <Text>{JSON.stringify(data)}</Text>
      </ScrollView> */}
      <FlashList
        data={TabHomeData}
        renderItem={renderItem}
        numColumns={4}
        estimatedItemSize={70}
      />
    </View>
  );
}
