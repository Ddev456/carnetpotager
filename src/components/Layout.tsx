import React, { type PropsWithChildren } from 'react';
// import NavigationMenuBar from './NavigationMenu';
import { MobileNav } from './MobileNav';
import { SidebarNav } from './Sidebar';

export const Layout = ({children}: PropsWithChildren) => {
  return (
    <main className="grid grid-cols-12 grid-rows-10 h-screen min-h-screen bg-gray-100">
        {/* <NavigationMenuBar /> */}
            <MobileNav />
          <SidebarNav />
        <div className="m-[2.5%] col-start-1 col-end-[13] sm:col-start-2 lg:col-start-3 sm:col-end-[13] row-start-2 row-end-[10] sm:row-start-1 sm:row-end-[10] flex flex-col gap-6">
            {children}
        </div>
    </main>
  );
};
