import { createContext, FC, useState } from 'react';

import AppLoadingIndicator from '../components/molecules/AppLoadingIndicator';

type ContextType = Readonly<{
  showScreenLoading(): void;
  hideScreenLoading(): void;
}>;

export const AppLoadingIndicatorContext = createContext<ContextType>(undefined!);

export const AppLoadingIndicatorContextProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const showScreenLoading = () => setIsLoading(true);
  const hideScreenLoading = () => setIsLoading(false);

  return (
    <AppLoadingIndicatorContext.Provider value={{ showScreenLoading, hideScreenLoading }}>
      {props.children}
      {isLoading && <AppLoadingIndicator />}
    </AppLoadingIndicatorContext.Provider>
  );
};
