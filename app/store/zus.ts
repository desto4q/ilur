import {AssetItem} from 'react-native-media-library2';
import {create} from 'zustand';
import {observable, observe} from '@legendapp/state';
import {observer} from '@legendapp/state/react';
import { atom } from 'jotai';

const settings$ = observable({theme: 'dark'});

interface IndexStore {
  items: AssetItem[];
  setItems: (num: AssetItem[]) => any;
}
const useIndexStore = create<IndexStore>(set => ({
  items: [],
  setItems: (num: AssetItem[]) =>
    set(state => ({
      items: num,
    })),
}));

interface SelectStore {
  selectedItems: {[key: string]: AssetItem}; // Object with keys as unique IDs
  addToSelected: (item: AssetItem) => void;
  removeFromSelected: (id: string) => void; // Optional: for removing an item
  clear: () => any;
}

const useSelectedStore = create<SelectStore>(set => ({
  selectedItems: {},

  addToSelected: (item: AssetItem) =>
    set(state => ({
      selectedItems: {
        ...state.selectedItems,
        [item.id]: item, // Use the item's unique ID as the key
      },
    })),

  removeFromSelected: (id: string) =>
    set(state => {
      const {[id]: _, ...rest} = state.selectedItems; // Omit the item by id
      return {selectedItems: rest};
    }),
  clear: () =>
    set({
      selectedItems: {},
    }),
}));
const selectModeAtom = atom(false);

const tempItems = observable<{items: AssetItem[]}>({items: []});

export {useIndexStore, tempItems, useSelectedStore,selectModeAtom};
