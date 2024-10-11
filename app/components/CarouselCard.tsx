import {View, Text} from 'react-native';
import {AssetItem} from 'react-native-media-library2';
import {tw} from '../utils/utils';
import {FasterImageView} from '@candlefinance/faster-image';
import {Zoomable} from '@likashefqet/react-native-image-zoom';
type screenWidth = number;
export default function CarouselCard({
  item,
  screenWidth,
}: {
  item: AssetItem;
  screenWidth: screenWidth;
}) {
  const date = new Date(Number(item.modificationTime));
  return (
    <View style={{height: '100%', width: screenWidth}}>
      <View style={tw('absolute z-10 bg-neutral-800 w-full p-2 bg-opacity-75')}>
        <Text numberOfLines={1}>{item.filename}</Text>
        <View style={tw('flex-row gap-4')}>
          <Text>{date.toLocaleString()}</Text>
          <Text>{item.mediaType}</Text>
          {item.mediaType == 'video' ?? <Text>{item.duration}</Text>}
        </View>
      </View>
      <Zoomable>
        <FasterImageView
          style={{flex: 1, width: screenWidth}}
          source={{url: item.uri}}
        />
      </Zoomable>
    </View>
  );
}
