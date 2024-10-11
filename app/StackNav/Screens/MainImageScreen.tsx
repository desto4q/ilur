import {View, InteractionManager, Dimensions, Image, Text} from 'react-native';
import CarouselCard from '../../components/CarouselCard';
import {useGalleryContext} from '../../Context/MainGalleryContext';
import {AssetItem} from 'react-native-media-library2';
import {FlashList} from '@shopify/flash-list';
import VideoCard from '../../components/VideoCard';

let dmen = Dimensions.get('screen');
interface AssetItemExt extends AssetItem {
  ScreenWidth?: number;
}
let renderItem = ({item}: {item: AssetItemExt}) => {
  switch (item.mediaType) {
    case 'video':
      return <VideoCard item={item} screenWidth={dmen.width} />;
    default:
      return <CarouselCard item={item} screenWidth={dmen.width} />;
  }
};
export default function MainImageScreen() {
  const {TabHomeData, currentRef} = useGalleryContext();
  return (
    <View style={{flex: 1, minHeight: 100}}>
      <FlashList
        data={TabHomeData}
        horizontal
        pagingEnabled
        decelerationRate={'fast'}
        renderItem={renderItem}
        estimatedItemSize={dmen.width}
        getItemType={item => item.mediaType}
        pinchGestureEnabled={false}
        initialScrollIndex={currentRef.current}
      />
    </View>
  );
}
