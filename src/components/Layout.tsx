import React, { type PropsWithChildren } from 'react';
import NavigationMenuBar from './NavigationMenu';

export const Layout = ({children}: PropsWithChildren) => {
  return (
    <main className="grid grid-cols-10 grid-rows-6 h-screen min-h-screen items-center bg-grayscale">
        <NavigationMenuBar />
        <div className="sm:m-8 m-1 h-full sm:col-start-2 sm:col-end-11 col-start-1 col-span-10 row-start-1 row-span-5 sm:row-end-7 flex flex-col gap-6 px-4 py-6">
            {children}
        </div>
    </main>
  );
};
