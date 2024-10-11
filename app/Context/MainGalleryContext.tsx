import {useQuery} from '@tanstack/react-query';
import {
  createContext,
  LegacyRef,
  PropsWithChildren,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {AssetItem, mediaLibrary} from 'react-native-media-library2';
import {generateEmptyObjectFromType, getAll} from '../api/galleryMethods';
import {VideoRef} from 'react-native-video';
import {useShallow} from 'zustand/shallow';
import {useSelectedStore} from '../store/zus';
type IGalleryContext = {
  currentRef: RefObject<number>; // Use number instead of Number
  TabHomeData?: AssetItem[];
  isFetching: boolean;
  refetch: () => any;
  selectMode: RefObject<boolean>;
};

let GalleryContext = createContext<IGalleryContext | undefined>({
  currentRef: {current: 0},
  TabHomeData: [],
  refetch: () => {},
  isFetching: true,
  selectMode: {current: false},
});
let GalleryContextProvider = ({children}: PropsWithChildren) => {
  let currentRef = useRef<number>(0);
  let {
    data: TabHomeData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['tabHome'],
    queryFn: async () => await getAll(),
  });
  let selectMode = useRef<boolean>(false);

  let values = {currentRef, TabHomeData, isFetching, refetch, selectMode};

  return (
    <GalleryContext.Provider value={values}>{children}</GalleryContext.Provider>
  );
};

let useGalleryContext = () => {
  let context = useContext(GalleryContext);
  if (!context) {
    throw new Error('wrap in GalleryContextProvider'); // Fix the spelling of 'Provider'
  }
  return context;
};

export {useGalleryContext, GalleryContextProvider};
