import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { LogoCP } from '~/assets/LogoCP';
import { getPotager } from './VegetableSheet';
import { RiHome2Line } from 'react-icons/ri';
import { GiPlantSeed } from 'react-icons/gi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { IoSettingsSharp } from 'react-icons/io5';

export const MobileNav = () => {
    const [isAppsOpen, toggleApps] = useState(false);
    const [isNotificationsOpen, toggleNotifications] = useState(false);
  return (
    <div className="max-h-[6rem] sm:hidden grid col-start-1 col-end-[13] row-start-1 row-end-2">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex justify-between items-center">
            <div className="flex justify-start items-center">
                <Link href="/" className="flex mr-4">
                    <LogoCP />
                    <div className="flex flex-col text-[1.5rem]">
                            <span className='text-dark font-extrabold'>Carnet</span>
                            <span className='text-lime-600 font-extrabold'>Potager</span>
                    </div>
                </Link>
                <form action="#" method="GET" className="hidden lg:block lg:pl-2">
                <label htmlFor="topbar-search" className="sr-only">Search</label>
                <div className="relative mt-1 lg:w-96">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                </div>
                </form>
            </div>
            <div className="flex items-center lg:order-2">
                    {/* <!-- Bell icon --> */}
                    <button onBlur={() => toggleNotifications(false)} onClick={() => toggleNotifications(true)} type="button" data-dropdown-toggle="apps-dropdown" className="p-2 text-primary rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                    </button>
                {/* <!-- Dropdown menu --> */}
                <div className={clsx("overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600", 
                {
                "flex flex-col absolute top-0 right-0 left-0 m-0 translate-y-100px": isNotificationsOpen
                },
                {
                "hidden overflow-hidden": !isNotificationsOpen
                }
                )}  id="notification-dropdown">
                    <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        Notifications
                    </div>
                    <div>
                        {Object.values(getPotager()).map((notifItem) => 
                    <Link key={notifItem.vegetable.id} href="#" className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                        <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full" src={notifItem.vegetable.thumbnail} alt="thumbnail" />
                        {/* <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                            <svg aria-hidden="true" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                        </div> */}
                        </div>
                        <div className="pl-3 w-full">
                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">Ajouté au potager :<span className="font-semibold text-gray-900 dark:text-white">{notifItem.vegetable.name}</span></div>
                            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">il y a quelques minutes</div>
                        </div>
                    </Link>
                    )}
                    {/* <a href="#" className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                        <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                        <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
                            <svg aria-hidden="true" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
                        </div>
                        </div>
                        <div className="pl-3 w-full">
                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Jese leos</span> and <span className="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</div>
                            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">10 minutes ago</div>
                        </div>
                    </a>
                    <a href="#" className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                        <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="Joseph McFall avatar" />
                        <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700">
                            <svg aria-hidden="true" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
                        </div>
                        </div>
                        <div className="pl-3 w-full">
                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span className="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See it and view more stories.</div>
                            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">44 minutes ago</div>
                        </div>
                    </a>
                    <a href="#" className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                        <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="Roberta Casas image" />
                        <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700">
                            <svg aria-hidden="true" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        </div>
                        </div>
                        <div className="pl-3 w-full">
                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span> mentioned you in a comment: <span className="font-medium text-primary-700 dark:text-primary-500">@bonnie.green</span> what do you say?</div>
                            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">1 hour ago</div>
                        </div>
                    </a>
                    <a href="#" className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div className="flex-shrink-0">
                        <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png" alt="Robert image" />
                        <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700">
                            <svg aria-hidden="true" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                        </div>
                        </div>
                        <div className="pl-3 w-full">
                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted a new video: Glassmorphism - learn how to implement the new design trend.</div>
                            <div className="text-xs font-medium text-primary-700 dark:text-primary-400">3 hours ago</div>
                        </div>
                    </a> */}
                    </div>
                    <a href="#" className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline">
                        <div className="inline-flex items-center">
                        <span className='mr-2'>Voir tout</span>
                        <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                        </div>
                    </a>
                </div>
                {/* <!-- Apps --> */}
                <button onClick={() => toggleApps(!isAppsOpen)} type="button" data-dropdown-toggle="apps-dropdown" className="p-2 text-primary rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                    {/* <!-- Icon --> */}
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div className={clsx("overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600", 
                {
                "flex flex-col absolute top-0 right-0 left-0 m-0 translate-y-100px": isAppsOpen
                },
                {
                "hidden overflow-hidden": !isAppsOpen
                }
                )} id="apps-dropdown">
                    <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        Applications
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4">
                    <Link onClick={() => toggleApps(false)} href="/" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <RiHome2Line className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"/>
                        <div className="text-sm text-gray-900 dark:text-white">Accueil</div>
                    </Link>
                    <Link onClick={() => toggleApps(false)} href="/legumotheque" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <GiPlantSeed className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" />
                        <div className="text-sm text-gray-900 dark:text-white">Légumothèque</div>
                    </Link>
                    <Link onClick={() => toggleApps(false)} href="/calendrier" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <AiOutlineCalendar className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" />
                        <div className="text-sm text-gray-900 dark:text-white">Calendrier</div>
                    </Link>
                    <Link onClick={() => toggleApps(false)} href="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path></svg>
                        <div className="text-sm text-gray-900 dark:text-white">Assistant</div>
                    </Link>
                    <Link onClick={() => toggleApps(false)} href="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                        <div className="text-sm text-gray-900 dark:text-white">Agenda</div>
                    </Link>
                    <Link onClick={() => toggleApps(false)} href="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <IoSettingsSharp className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"/>
                        <div className="text-sm text-gray-900 dark:text-white">Paramètres</div>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
        </nav>
    </div>
  );
};
