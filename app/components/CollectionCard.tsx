import {Image, Text, TouchableOpacity, View} from 'react-native';
import {tw} from '../utils/utils';
import {getSingle} from '../api/galleryMethods';
import {useQuery} from '@tanstack/react-query';
import * as MediaLibrary from 'expo-media-library';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Define your navigation param list
type RootStackParamList = {
  CollectionsScreen: {item: MediaLibrary.Album}; // Define the type for CollectionsScreen
};

let CollectionCard = ({item}: {item: MediaLibrary.Album}) => {
  // Correctly type the navigation
  let navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  let {data, isFetching} = useQuery({
    queryKey: ['col', item.id],
    queryFn: async () => await getSingle(item.id),
  });

  let onPress = () => {
    navigation.navigate('CollectionsScreen', {
      item: item, // Pass the album item to the CollectionsScreen
    });
  };

  return (
    <View style={tw('w-full aspect-square p-2 gap-1')}>
      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        {!isFetching ? (
          data && data[0] ? (
            <Image
              source={{uri: data[0]?.uri}}
              style={tw('rounded-md flex-1')}
            />
          ) : null
        ) : (
          <View style={{flex: 1}}></View>
        )}
      </TouchableOpacity>
      <View style={tw('w-full flex-row justify-between')}>
        <Text style={tw('text-lg max-w-3/4 ')} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={tw('text-lg')}>{item.assetCount}</Text>
      </View>
    </View>
  );
};

export default CollectionCard;
