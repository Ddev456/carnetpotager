import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

export const TooltipQuestion = ({tooltipContent}: {tooltipContent: string[]}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="absolute inset-y-0 right-0 text-gray-500 shadow-dark inline-flex h-[35px] w-[35px] items-center justify-center rounded-full shadow-[0_2px_10px] outline-none">
            <AiOutlineQuestionCircle />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-white data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            sideOffset={5}
          >
            {tooltipContent.map((content, index)=> { 
              return <div key={index}><br/> {content} </div>;
              })}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
