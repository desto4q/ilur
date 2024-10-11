import {
    createContext,
    PropsWithChildren,
    RefObject,
    useContext,
    useRef,
  } from 'react';
  import { Modalize } from 'react-native-modalize';
  import CustomModal from '../components/CustomModal';
  import { AssetItem } from 'react-native-media-library2';
  
  // Define the correct interface for ModalContext
  interface ModalContextType {
    modalizeRef: RefObject<Modalize>;
    openModal: () => void;
  }
  
  // Fix the context to use the correct type
  const ModalContext = createContext<ModalContextType | null>(null);
  
  const ModalContextProvider = ({ children }: PropsWithChildren) => {
    const modalizeRef = useRef<Modalize>(null);
  
    // Function to open the modal
    const openModal = () => {
      modalizeRef.current?.open();
    };
  
    // Value provided by the context
    const values = { modalizeRef, openModal };
  
    return (
      <ModalContext.Provider value={values}>
        {children}
        {/* Pass the modalizeRef to the CustomModal */}
        <CustomModal ref={modalizeRef} />
      </ModalContext.Provider>
    );
  };
  
  // Hook to use the ModalContext
  const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error('wrap in ModalContextProvider');
    }
    return context;
  };
  
  export { useModalContext, ModalContextProvider };
  