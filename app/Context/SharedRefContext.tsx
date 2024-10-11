import React, {
  createContext,
  PropsWithChildren,
  useRef,
  useContext,
  MutableRefObject,
} from 'react';

type SharedRefContextType = MutableRefObject<boolean>;

const SharedRefContext = createContext<SharedRefContextType>({current: false});

const SharedRefProvider = ({children}: PropsWithChildren) => {
  const sharedVarRef = useRef(false);

  return (
    <SharedRefContext.Provider value={sharedVarRef}>
      {children}
    </SharedRefContext.Provider>
  );
};

const useSharedRef = (): MutableRefObject<boolean> => {
  const context = useContext(SharedRefContext);

  if (context === null) {
    throw new Error('useSharedRef must be used within a SharedRefProvider');
  }
  return context;
};
export {SharedRefProvider, useSharedRef};

// Custom hook to use the
