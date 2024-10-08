import {useQuery} from '@tanstack/react-query';
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {AssetItem, mediaLibrary} from 'react-native-media-library2';
import {getAll} from '../api/galleryMethods';
type IGalleryContext = {
  currentRef: RefObject<number>; // Use number instead of Number
  TabHomeData?: AssetItem[];
};

let GalleryContext = createContext<IGalleryContext | undefined>({
  currentRef: {current: 0},
  TabHomeData: [],
}); // Set the default to undefined
let GalleryContextProvider = ({children}: PropsWithChildren) => {
  let currentRef = useRef<number>(0); // Specify the type as number
  let {data: TabHomeData} = useQuery({
    queryKey: ['tabHome'],
    queryFn: async () => await getAll(),
  });

  let values = {currentRef, TabHomeData};

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
