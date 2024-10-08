import {create} from 'zustand';
interface IndexStore {
  index: number;
  setIndex: (num: number) => any;
}
const useIndexStore = create<IndexStore>(set => ({
  index: 0,
  setIndex: num =>
    set(state => ({
      index: num,
    })),
}));

export {useIndexStore}
