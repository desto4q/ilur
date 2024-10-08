import {Image, Text, TouchableOpacity, View} from 'react-native';
import {tw} from '../utils/utils';
import {getSingle} from '../api/galleryMethods';
import {useQuery} from '@tanstack/react-query';
import * as MediaLibrary from 'expo-media-library';
import {useNavigation} from '@react-navigation/native';
let CollectionCard = ({item}: {item: MediaLibrary.Album}) => {
  let {data, isFetching} = useQuery({
    queryKey: ['col', item.id],
    queryFn: async () => await getSingle(item.id),
  });
  let navigation = useNavigation();
  let onPress = () => {
    navigation.navigate('CollectionsScreen',{
        collId: item.id,
    });
  };
  return (
    <View style={tw('w-full aspect-square bg-red-200 ')}>
      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        {!isFetching ? (
          data && data[0] ? (
            <Image source={{uri: data[0]?.uri}} style={{flex: 1}} />
          ) : null
        ) : (
          <View style={{flex: 1}}></View>
        )}
      </TouchableOpacity>
      <Text>{item.title}</Text>
    </View>
  );
};

export default CollectionCard;
