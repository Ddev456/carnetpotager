import React, { type PropsWithChildren } from 'react';
import NavigationMenuBar from './NavigationMenu';

export const Layout = ({children}: PropsWithChildren) => {
  return (
    <main className="grid grid-cols-10 grid-rows-10 h-screen min-h-screen bg-grayscale">
        <NavigationMenuBar />
        <div className="m-[2.5%] sm:col-start-2 sm:col-span-9 col-end-[11] col-start-1 row-start-1 row-end-[10] sm:row-end-[10] flex flex-col gap-6">
            {children}
        </div>
    </main>
  );
};
