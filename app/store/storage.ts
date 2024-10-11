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

let getAllCollections = async () => {
  let resp = collections.indexer.arrays.getKeys();
  return resp;
};
let createCollection = async (key: string, item?: AssetItem[]) => {
  let tempItem: AssetItem[] = [];
  if (item) {
    tempItem = item;
  }
  let resp = collections.setArray(key, tempItem);
};
let updateCollection = async (key: string, data: AssetItem[]) => {
  let resp = collections.getArray(key);
  let newArr = [...resp, ...data];
  let saved = await collections.setArray(key, newArr);
  return resp;
};
export {createCollection, getAllCollections, updateCollection};
