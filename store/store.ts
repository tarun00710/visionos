import {create} from 'zustand';

type ImageStore = {
  //   count: number;
  allImages: any[]
  image: string | null;
};

type ImageActions = {
  //   increment: () => void;
  //   decrement: () => void;
  setAllImages:(allImages:any[]) => void
  setImage: (newImage: string) => void;
};

const useImageStore = create<ImageStore & ImageActions>(set => ({

  // Define your state
  allImages:[],
  image: null,

  // Define actions
  setAllImages : allImages => set({allImages:allImages}),
  setImage: newImage => set({image: newImage}),
}));

export default useImageStore;
