import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Button,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useEffect, RefObject, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {useModalContext} from '../Context/ModalContext';
import {AssetItem} from 'react-native-media-library2';
import {tw} from '../utils/utils';
import {tempItems, useIndexStore, useSelectedStore} from '../store/zus';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {useQuery} from '@tanstack/react-query';
import {
  createCollection,
  getAllCollections,
  updateCollection,
} from '../store/storage';
import {FlashList} from '@shopify/flash-list';

let renderItem = ({item}: {item: string}) => {
  return <ColCard title={item} />;
};
let renderThumbs = ({item}: {item: AssetItem}) => {
  return <ModalThumbs item={item} />;
};

const CustomModal = () => {
  const {modalizeRef} = useModalContext();
  let items = useSelectedStore(state => state.selectedItems);
  let [name, setName] = useState('');
  let {data, refetch} = useQuery({
    queryKey: ['savedCols'],
    queryFn: async () => await getAllCollections(),
  });
  let saveRef = useRef<Modalize>(null);

  let dimen = useWindowDimensions();
  return (
    <Modalize
      avoidKeyboardLikeIOS
      ref={modalizeRef}
      customRenderer={
        <Animated.View style={tw('flex-1 bg-neutral-900')}>
          <View style={tw('flex-row p-2 items-center')}>
            <Text>Save</Text>
            <TouchableOpacity
              onPress={async () => {
                saveRef.current?.open();
              }}
              style={tw('bg-neutral-600 rounded-md p-2 ml-auto')}>
              <Text>New Collection</Text>
            </TouchableOpacity>
          </View>
          <FlashList
            data={Object.values(items)}
            numColumns={5}
            renderItem={renderThumbs}
            ListFooterComponent={
              <View style={tw('m-1')}>
                <FlashList
                  data={data}
                  renderItem={renderItem}
                  estimatedItemSize={24}
                />
              </View>
            }
            estimatedItemSize={dimen.width / 4}
          />
          <Text>{JSON.stringify(data)}</Text>
          <TouchableOpacity
            style={tw('p-2')}
            onPress={() => {
              refetch();
            }}>
            <Text>refetc</Text>
          </TouchableOpacity>

          <Modalize
            ref={saveRef}
            avoidKeyboardLikeIOS
            snapPoint={dimen.height / 2}
            customRenderer={
              <Animated.View style={tw('flex-1 bg-neutral-800 p-2')}>
                <Text style={tw('my-1 text-lg')}>Collection Name</Text>
                <View
                  style={tw('h-16 px-2 border border-neutral-600 rounded-md')}>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="name"
                    style={tw('flex-1 text-lg')}></TextInput>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    if (name.length < 1) {
                      Alert.alert(
                        'Name field is empty',
                        'Name cannot be empty',
                      );
                    }
                    let values: AssetItem[] = [];
                    if (Object.keys(items).length > 0) {
                      values = Object.values(items);
                    }

                    await createCollection(name, values);
                    await refetch();
                    saveRef.current?.close();
                  }}
                  style={tw(
                    'p-2 bg-emerald-700 rounded-md  items-center my-2 justify-center',
                  )}>
                  <Text style={tw('text-lg')}>Save</Text>
                </TouchableOpacity>
              </Animated.View>
            }></Modalize>
        </Animated.View>
      }
    />
  );
};
let ColCard = ({title}: {title: string}) => {
  let items = useSelectedStore(state => state.selectedItems);
  let clear = useSelectedStore(state=>state.clear)
  let {modalizeRef} = useModalContext();
  let onPress = async () => {
    let arr = Object.values(items);
    try {
      await updateCollection(title, arr);
      Alert.alert('Saved', 'Saved to ' + title, [
        {
          text: 'Close',
          onPress: () => {
            clear()
            modalizeRef.current?.close();
            console.log('Close Pressed');
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw(
        'bg-neutral-800 border border-neutral-700 my-1 h-12 items-center justify-center px-2 rounded-md',
      )}>
      <View style={tw('justify-center items-center')}>
        <Text style={tw('text-lg')}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

let ModalThumbs = ({item}: {item: AssetItem}) => {
  return (
    <View style={tw('h-16 w-full p-[2px]')}>
      <Image
        style={{flex: 1}}
        source={{
          uri: item.uri,
        }}
      />
    </View>
  );
};

export default CustomModal;
