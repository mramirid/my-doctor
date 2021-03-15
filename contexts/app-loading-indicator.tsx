import React, { createContext, FC, useCallback, useState } from 'react';

import AppLoadingIndicator from '../components/molecules/AppLoadingIndicator';

interface ContextType {
  showScreenLoading: () => void;
  hideScreenLoading: () => void;
}

export const AppLoadingIndicatorContext = createContext<ContextType>(undefined!);

export const AppLoadingIndicatorContextProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const showScreenLoading = useCallback(() => setIsLoading(true), []);
  const hideScreenLoading = useCallback(() => setIsLoading(false), []);

  return (
    <AppLoadingIndicatorContext.Provider value={{ showScreenLoading, hideScreenLoading }}>
      {props.children}
      {isLoading && <AppLoadingIndicator />}
    </AppLoadingIndicatorContext.Provider>
  );
};
