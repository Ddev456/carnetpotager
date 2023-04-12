import { type ComponentPropsWithoutRef } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link.js';
import { BsCalendar2Check } from 'react-icons/bs';
import { GiGardeningShears, GiCarrot } from 'react-icons/gi';
import { MdOutlineSettings} from 'react-icons/md';
import { LogoCP } from '~/assets/LogoCP';
import { BiMessageDots } from "react-icons/bi";
import { AiOutlineStar } from 'react-icons/ai';
import { ImStatsDots } from 'react-icons/im';
import { TbShovel } from 'react-icons/tb';
import { TfiAgenda } from 'react-icons/tfi';
import { MdFlashAuto } from 'react-icons/md';
import { BsToggles } from 'react-icons/bs';
import { useRouter } from 'next/router';
import clsx from 'clsx';

// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
type ListItemProps = {
    href: string;
    link: string;
    classnames: string;
    icon: JSX.Element;
} & ComponentPropsWithoutRef<"a">

const ListItem = ({ href, link, classnames, icon }: ListItemProps) => (
    <li>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
            <svg aria-hidden="true" className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
            Prochainement
          </span>
        <Link
          href={`/${href}`}
          className={clsx("cursor-no-drop relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group",
          classnames)
          }
        >
          <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-dark text-white font-semibold rounded-md group-hover:bg-opacity-0">
          {icon}
          {link}
          </span>
        </Link>
    </li>
  );

const NavigationMenuBar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <NavigationMenu.Root className="px-[3rem] sm:m-[10%] text-dark row-start-[10] row-span-1 sm:col-start-1 sm:col-end-[2] col-span-10 sm:col-span-1 sm:row-start-1 sm:row-end-[10] row-start-6 z-[20] sm:z-[20] flex justify-around sm:px-4 sm:py-6 sm:p-0">
      <NavigationMenu.List className="bg-white w-[20rem] sm:w-full sm:h-full sm:flex-col flex sm:justify-around list-none rounded-[6px] overflow-x-auto">
        <Link href="/" className='hidden sm:flex flex-col p-2 items-center'>
        <LogoCP />
        <span className='text-dark font-bold hidden lg:block'>Carnet</span>
        <span className='text-lime-600 font-bold hidden lg:block'>Potager</span>
        </Link>

        <NavigationMenu.Item className='grid justify-items-center'>
          
          <NavigationMenu.Trigger className={clsx("flex-col text-dark hover:bg-lime-200 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 font-medium leading-none outline-none",
          {
            "text-white bg-gradient-to-br from-violet-500 to-purple-500 group-hover:from-violet-500 group-hover:to-purple-500" : currentRoute === '/'
          })}
          >
           <Link href="/" className='flex flex-col items-center pointer-events-none sm:pointer-events-auto'>
                <GiGardeningShears className='sm:text-normal text-[2rem]' />
                <span className='sm:hidden lg:block text-[1rem]'>Mon potager</span>
            </Link>
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="sm:data-[motion=from-start]:animate-enterFromLeft sm:data-[motion=from-end]:animate-enterFromRight sm:data-[motion=to-start]:animate-exitToLeft sm:data-[motion=to-end]:animate-exitToRight absolute bottom-full left-0 sm:top-[20%] sm:left-full w-full sm:w-auto">
            <ul className="bg-dark one m-0 list-none gap-x-[10px] p-[22px] sm:w-[12rem] flex flex-col">
              <li className="">
                {/* <NavigationMenu.Link asChild> */}
                  <Link href="/" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-violet-500 to-purple-500 group-hover:from-violet-500 group-hover:to-purple-500 hover:text-white">
                      <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-dark text-white font-semibold rounded-md group-hover:bg-opacity-0">
                      <GiGardeningShears className='text-[1rem] mr-1' /> Mon Potager
                      </span>
                  </Link>
                {/* </NavigationMenu.Link> */}
              </li>
              <ListItem href="#" classnames="bg-gradient-to-br from-amber-500 to-yellow-100 group-hover:from-amber-500 group-hover:to-yellow-100 hover:text-white" link="Plantes Favorites" icon={<AiOutlineStar className='text-[1rem] mr-1' />}/>
              <ListItem href="#" classnames="group bg-gradient-to-br from-slate-500 to-dark__bg group-hover:from-slate-500 group-hover:to-dark__gb hover:text-white" link="Statistiques du potager" icon={<ImStatsDots className='text-[1rem] mr-1' />}/>
            </ul>
          </NavigationMenu.Content>








        </NavigationMenu.Item>

        <NavigationMenu.Item className='grid justify-items-center'>
        
          <NavigationMenu.Trigger
          className={clsx("flex-col text-dark flex select-none hover:bg-lime-200 items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none",
          {
            "text-white from-primary to-teal-500 bg-gradient-to-br group group-hover:from-primary group-hover:to-teal-500" : currentRoute === '/legumotheque'
          })}
          >
            <Link href="/legumotheque" className='flex flex-col items-center pointer-events-none sm:pointer-events-auto'>
              <GiCarrot className='sm:text-normal text-[2rem]' />
              <span className='sm:hidden lg:block text-[1rem]'>Légumothèque</span>
            </Link>
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="sm:data-[motion=from-start]:animate-enterFromLeft sm:data-[motion=from-end]:animate-enterFromRight sm:data-[motion=to-start]:animate-exitToLeft sm:data-[motion=to-end]:animate-exitToRight absolute bottom-full left-0 sm:top-[35%] sm:left-full w-full sm:w-auto">
            <ul className="bg-dark one m-0 list-none gap-x-[10px] p-[22px] sm:w-[14rem] flex flex-col">
              <li className="">
                {/* <NavigationMenu.Link asChild> */}
                  <Link href="/legumotheque" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary to-teal-500 group-hover:from-primary group-hover:to-teal-500 hover:text-white">
                      <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-dark text-white font-semibold rounded-md group-hover:bg-opacity-0">
                      <GiCarrot  className='text-[1rem] mr-1' /> Légumothèque
                      </span>
                  </Link>
                {/* </NavigationMenu.Link> */}
              </li>

              <ListItem classnames="group bg-gradient-to-br from-slate-500 to-dark__bg group-hover:from-slate-500 group-hover:to-dark__gb hover:text-white" link="Que faire au potager ?" href="#" icon={<TbShovel className='mr-1 text-[1rem]' />}/>
              
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item className='grid justify-items-center'>
          
            <NavigationMenu.Trigger className={clsx("flex-col text-dark group flex hover:bg-lime-200 select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none",
            {
              "text-white bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500" : currentRoute === '/calendrier'
            })}>
            <Link href="/calendrier" className='flex flex-col items-center pointer-events-none sm:pointer-events-auto'>       
                <BsCalendar2Check className='sm:text-normal text-[2rem]' />
                <span className='sm:hidden lg:block text-[1rem]'>Calendrier</span>
            </Link>
            </NavigationMenu.Trigger>
        
          <NavigationMenu.Content className="sm:data-[motion=from-start]:animate-enterFromLeft sm:data-[motion=from-end]:animate-enterFromRight sm:data-[motion=to-start]:animate-exitToLeft sm:data-[motion=to-end]:animate-exitToRight absolute bottom-full left-0 sm:top-[55%] sm:left-full w-full sm:w-auto">
            <ul className="bg-dark one m-0 list-none gap-x-[10px] p-[22px] sm:w-[12rem] flex flex-col">
              <li className="">
                  <Link href="/calendrier" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white">
                      <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-dark text-white font-semibold rounded-md group-hover:bg-opacity-0">
                      <BsCalendar2Check  className='text-[1rem] mr-1' /> Calendrier
                      </span>
                  </Link>
              </li>
              <ListItem classnames="group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white" href="#" link="Agenda" icon={<TfiAgenda className='mr-1 text-[1rem]'  />}/>
              <ListItem classnames="group bg-gradient-to-br from-amber-400 to-orange-600 group-hover:from-amber-400 group-hover:to-orange-600 hover:text-white" href="#" link="Assistant" icon={<MdFlashAuto className='mr-1 text-[1rem]' />}/>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <hr className='hidden sm:block mx-6'/>

        <NavigationMenu.Item className='grid justify-items-center'>
          <NavigationMenu.Trigger className={clsx("flex-col text-dark group flex select-none hover:bg-lime-200 items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none", 
          {
            "text-white bg-gradient-to-br from-amber-400 to-orange-300 group-hover:from-amber-400 group-hover:to-orange-300" : currentRoute === '/settings'
          })}>
            <Link href="/" className='flex flex-col items-center pointer-events-none sm:pointer-events-auto'>
          <MdOutlineSettings className='sm:text-normal text-[2rem]' />
          <span className='sm:hidden lg:block text-[1rem]'>Paramètres</span>
          </Link>
            {/* <CaretDownIcon
              className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            /> */}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="sm:data-[motion=from-start]:animate-enterFromLeft sm:data-[motion=from-end]:animate-enterFromRight sm:data-[motion=to-start]:animate-exitToLeft sm:data-[motion=to-end]:animate-exitToRight absolute bottom-full left-0 sm:top-[70%] sm:left-full w-full sm:w-auto">
            <ul className="bg-dark one m-0 list-none gap-x-[10px] p-[22px] sm:w-[12rem] flex flex-col">
              <li className="">
                {/* <NavigationMenu.Link asChild> */}
                <Link
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-stone-500 to-neutral-500 group-hover:from-stone-500 group-hover:to-neutral-500 hover:text-white"
                    href="#"
                  >
                    <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-dark text-white font-semibold rounded-md group-hover:bg-opacity-0">
                    <MdOutlineSettings  className='mr-1' />
                      Paramètres
                    </span>
                    {/* <p className="text-mauve4 text-[14px] leading-[1.3]">
                      Gérez tout vos paramètres ici
                    </p> */}
                  </Link>
                {/* </NavigationMenu.Link> */}
              </li>
              <ListItem classnames="group bg-gradient-to-br from-slate-500 to-dark__bg group-hover:from-slate-500 group-hover:to-dark__gb hover:text-white" href="#" link="Mode sombre" icon={<BsToggles className='mr-1 text-[1rem]' />} />
              <ListItem classnames="group bg-gradient-to-br from-slate-500 to-dark__bg group-hover:from-slate-500 group-hover:to-dark__gb hover:text-white" href="#" link="Donner votre avis" icon={<BiMessageDots className='mr-1 text-[1rem]' />}/>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
        </NavigationMenu.Indicator> */}
      </NavigationMenu.List>

      {/* <div className="perspective-[2000px] absolute sm:left-[100%] sm:bottom-auto bottom-full sm:w-auto w-[90%] flex sm:justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div> */}
    </NavigationMenu.Root>
  );
};

export default NavigationMenuBar;
