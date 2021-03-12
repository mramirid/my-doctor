import React, { createContext, FC, useCallback, useState } from 'react';

import AppLoadingIndicator from '../../components/molecules/AppLoadingIndicator';

interface ContextType {
  showLoading: () => void;
  hideLoading: () => void;
}

export const AppLoadingIndicatorContext = createContext<ContextType>(undefined!);

export const AppLoadingIndicatorContextProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => setIsLoading(true), []);
  const hideLoading = useCallback(() => setIsLoading(false), []);

  return (
    <AppLoadingIndicatorContext.Provider value={{ showLoading, hideLoading }}>
      {props.children}
      {isLoading && <AppLoadingIndicator />}
    </AppLoadingIndicatorContext.Provider>
  );
};
