import {AssetItem} from 'react-native-media-library2';
import {MMKVLoader} from 'react-native-mmkv-storage';

let collections = new MMKVLoader().withInstanceID('collections').initialize();

let toString = (item: any[]): string => {
  try {
    let resp = JSON.stringify(item);
    return resp;
  } catch (err) {
    return '[]';
  }
};
let createCollections = async ({
  name,
  items,
}: {
  name: string;
  items?: AssetItem[];
}) => {
  let jsonItems = toString([]);
  if (items) {
    jsonItems = toString(items);
  }
  let resp = await collections.setItem(name, jsonItems);
  return resp;
};

export {createCollections};
