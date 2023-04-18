import React, { useState } from 'react';
import { Sidebar, Badge } from 'flowbite-react';
import { RiHome2Line } from 'react-icons/ri';
import { GiPlantSeed } from 'react-icons/gi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { IoSettingsSharp } from 'react-icons/io5';
import { CgArrowAlignH } from 'react-icons/cg';
import { VscFeedback } from 'react-icons/vsc';
import clsx from 'clsx';
import Link from 'next/link';

export const SidebarNav = () => {
    const [hideSideBar, toggleSideBar] = useState(false);
    // const [hideAlert, setHideAlert] = useState(false);
  return (
    // <div className="hidden sm:block sm:col-start-1 sm:col-end-2 lg:sm:col-end-3 sm:row-start-1 sm:row-end-[10]">
    <div className={clsx('hidden sm:block sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-[10]',
    {
       "lg:col-end-2": hideSideBar
    }, {
       "lg:col-end-3": !hideSideBar
    })}>
    <div className="h-full">
    <Sidebar className='w-full' aria-label="Sidebar">
        <button className='dark:text-white hidden lg:block' onClick={() => toggleSideBar(!hideSideBar)}><CgArrowAlignH className='text-gray-900 text-[2rem]'/></button>
    <Sidebar.Logo
    className='flex flex-col -m-[5%] -mt-[20%]'
      href="#"
      img="LogoM.svg"
      imgAlt="Carnet Potager logo"
    >
     <span className={clsx('hidden lg:block',
     {
        "lg:hidden": hideSideBar
     }, {
        "lg:block": !hideSideBar
     })}>Carnet Potager</span>
    </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link href="/" className='flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'>
          {/* <Sidebar.Item
            className="flowbite-sidebar-item"
            icon={RiHome2Line}
          > */}
          <RiHome2Line className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'/>
              <span className={clsx('px-3 flex-1 whitespace-nowrap hidden lg:block',
              {
                  "lg:hidden": hideSideBar
              }, {
                  "lg:block": !hideSideBar
              })}>Accueil</span>
          {/* </Sidebar.Item> */}
            </Link>
            <Link href="/legumotheque" className='flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'>
            <GiPlantSeed className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'/>
              <span className={clsx('px-3 flex-1 whitespace-nowrap hidden lg:block',
              {
                  "lg:hidden": hideSideBar
              }, {
                  "lg:block": !hideSideBar
              })}>Légumothèque</span>
            </Link>
            <Link href="/calendrier" className='flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'>
       
         <AiOutlineCalendar className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'/>
              <span className={clsx('px-3 flex-1 whitespace-nowrap hidden lg:block',
              {
                  "lg:hidden": hideSideBar
              }, {
                  "lg:block": !hideSideBar
              })}>Calendrier</span>
           
            </Link>
            <Link href="#" className='flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'>
            <IoSettingsSharp className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'/>
            <span className={clsx('px-3 flex-1 whitespace-nowrap hidden lg:block',
     {
        "lg:hidden": hideSideBar
     }, {
        "lg:block": !hideSideBar
     })}>Paramètres</span>
     </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <Sidebar.CTA>
      {/* <Sidebar.CTA className={clsx({
        "hidden": hideAlert
      })}> */}
        {/* <div className="hidden lg:flex mb-3 items-center"> */}
        <div className={clsx('hidden lg:flex mb-3 items-center',
     {
        "lg:hidden": hideSideBar
     }, {
        "lg:flex": !hideSideBar
     })}>
          <Badge color="warning">
            Beta
          </Badge>
          <button
            aria-label="Close"
            className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-blue-50 p-1 text-blue-900 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
            type="button"
          >
          {/* <button
            onClick={() => setHideAlert(true)}
            aria-label="Close"
            className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-blue-50 p-1 text-blue-900 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
            type="button"
          > */}
            <svg
              aria-hidden={true}
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* <p className="hidden lg:block "> */}
        <p className={clsx('hidden lg:block mb-3 text-sm text-blue-900 dark:text-blue-400',
     {
        "lg:hidden": hideSideBar
     }, {
        "lg:block": !hideSideBar
     })}>
          L'application carnet potager est actuellement en version démo. Aucune donnée n'est sauvegardée.
        </p>
        <a
          className="cursor-no-drop hidden lg:block text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          href="#"
        >
          <VscFeedback className='text-[2rem]'/> <span className={clsx('hidden lg:block',
     {
        "lg:hidden": hideSideBar
     }, {
        "lg:block": !hideSideBar
     })}>Donnez votre avis</span>
        </a>
      </Sidebar.CTA>
    </Sidebar>
  </div>
  </div>
  );
};
