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
  // Get the current array from storage
  let resp = collections.getArray(key) as AssetItem[];

  // Merge the new data with the existing data, removing duplicates by id
  let newArr = [...resp, ...data].reduce((acc: AssetItem[], item) => {
    // Check if the item with the same id already exists in the accumulator
    if (!acc.some(existingItem => existingItem.id === item.id)) {
      acc.push(item);  // Add only if it's not a duplicate
    }
    return acc;
  }, []);

  // Save the updated array back to storage
  let saved = await collections.setArray(key, newArr);

  return newArr; // Return the updated array
};

let getCollection = async (key: string): Promise<AssetItem[]> => {
  let resp: AssetItem[] = collections.getArray(key);
  return resp;
};
let DeleteFromCol = async (key: string, data: AssetItem[]) => {
  let resp = collections.setArray(key, data);
  return resp;
};
export {createCollection, getAllCollections, updateCollection, getCollection,DeleteFromCol};
