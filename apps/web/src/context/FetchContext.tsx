import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FetchContextType {
  shouldFetch: boolean;
  setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FetchContext = createContext<FetchContextType | undefined>(undefined);

export const FetchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  return (
    <FetchContext.Provider value={{ shouldFetch, setShouldFetch }}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetch = () => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error('useFetch deve ser usado dentro de um FetchProvider');
  }
  return [context.shouldFetch, context.setShouldFetch];
};
