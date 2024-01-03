import { Link } from "react-router-dom";
import { DropdownMenu, Button } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

interface DropDownMenuProps<T> {
  name: string;
  items: T[];
  label: keyof T;
}

export default function DropDownMenu<T>({ name, items, label }: DropDownMenuProps<T>) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" className="text-primary hover:text-primary-dark  p-0 text-base">
          {name}
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <div className="w-[50vw] sm:w-[25vw] grid grid-cols-items">
          {items.map((item, index) => (
            //   {item[label] as ReactNode} 
            <Link key={index} to={`/${name}/${item[label]}`}>
              <DropdownMenu.Item className="hover:bg-tertiary hover:text-primary ">
                {item[label] as ReactNode}
              </DropdownMenu.Item>
            </Link>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
