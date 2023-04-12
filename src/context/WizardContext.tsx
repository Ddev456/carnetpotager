import { createContext, type PropsWithChildren, useContext } from 'react';
import { type VegetableType } from '~/lib/scheme/vegetables';

type WizardContextInput = {
  values: VegetableType[];
}

const WizardContext = createContext<WizardContextInput | null>(null);

type WizardContextProviderProps = {
  values: VegetableType[]
}

export const WizardContextProvider = ({ values, children }: PropsWithChildren<WizardContextProviderProps>) => {

  return <WizardContext.Provider value={{values}}>{children}</WizardContext.Provider>;
};

export const useWizard = () => {
  const context = useContext(WizardContext);

  if (context === null) {
    throw new Error('useWizard must be used within a WizardProvider');
  }

  // On est sûr que context n'est pas null -> `useContext` est sécurisé ✅
  // Ce qui nous permettera de ne pas avoir besoin de faire des vérifications
  return context;
};
