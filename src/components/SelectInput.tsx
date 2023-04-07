import { type PropsWithChildren } from 'react';
import * as Select from '@radix-ui/react-select';
import { RiArrowDropDownLine, RiArrowUpSLine } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';

type SelectItemProps = {
    value: string;
}

const SelectItem = ({ children, ...props }: PropsWithChildren<SelectItemProps>) => {
    return (
      <Select.Item
        className=
          'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'
        {...props}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <AiOutlineCheck />
        </Select.ItemIndicator>
      </Select.Item>
    );
  };

type SelectInputProps = {
  handleChange: (event: string) => void
}

export const SelectInput = ({handleChange}: SelectInputProps) => {
  return (
    <Select.Root onValueChange={handleChange} >
    <Select.Trigger
      className="border border-gray-600 inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-gray-700 text-white focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
      aria-label="Food"
    >
      <Select.Value placeholder="Sélectionner une plante…" />
      <Select.Icon className="text-violet11">
        <RiArrowDropDownLine />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden bg-gray-700 text-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <RiArrowUpSLine />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
              Catégories plantes
            </Select.Label>
            <SelectItem value="">Tout</SelectItem>
            <SelectItem value="légume">Légumes</SelectItem>
            <SelectItem value="fruit">Petits fruits</SelectItem>
            <SelectItem value="aromatique">Aromatiques</SelectItem>
            <SelectItem value="fleur">Fleurs</SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <RiArrowDropDownLine />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
  );
};
