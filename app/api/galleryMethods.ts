import * as MediaLibrary from 'expo-media-library';
import {
  AssetItem,
  CollectionItem,
  mediaLibrary,
} from 'react-native-media-library2';

const generateEmptyObjectFromType = <T extends object>(): Record<
  keyof T,
  any
> => {
  return {} as Record<keyof T, any>;
};
let getCollections = async (): Promise<MediaLibrary.Album[]> => {
  try {
    let resp = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    return resp;
  } catch (err) {
    console.log(err);
    let resp = generateEmptyObjectFromType<MediaLibrary.Album[]>();
    return resp;
  }
};

let getSingle = async (albumId: string): Promise<AssetItem[]> => {
  try {
    let resp = mediaLibrary.getAssets({
      collectionId: albumId,
      limit: 1,
    });
    return resp;
  } catch (err) {
    console.log(err);
    let resp = generateEmptyObjectFromType<AssetItem[]>();
    return resp;
  }
};
let getAll = async (): Promise<AssetItem[]> => {
  try {
    let resp = await mediaLibrary.getAssets({});
    return resp;
  } catch (err) {
    console.log(err);
    let resp = generateEmptyObjectFromType<AssetItem[]>();
    return resp;
  }
};

let getCollectionItems = async (albumId: string): Promise<AssetItem[]> => {
  try {
    let resp = mediaLibrary.getAssets({
      collectionId: albumId,
    });
    return resp;
  } catch (err) {
    console.log(err);
    let resp = generateEmptyObjectFromType<AssetItem[]>();
    return resp;
  }
};
export {
  getCollections,
  getSingle,
  getAll,
  getCollectionItems,
  generateEmptyObjectFromType,
};
