import { type Plants } from '@prisma/client';
import { createContext, type PropsWithChildren, useContext } from 'react';

type WizardContextInput = {
  values: Plants[];
}

const WizardContext = createContext<WizardContextInput | null>(null);

type WizardContextProviderProps = {
  values: Plants[]
}

export const WizardContextProvider = ({ values, children }: PropsWithChildren<WizardContextProviderProps>) => {

  return <WizardContext.Provider value={{values}}>{children}</WizardContext.Provider>;
};

export const useWizard = () => {
  const context = useContext(WizardContext);

  if (context === null) {
    throw new Error('useWizard must be used within a WizardProvider');
  }

  return context;
};
