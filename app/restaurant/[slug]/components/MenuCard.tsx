import { Item } from "@prisma/client";
import React from "react";

export interface MenuCardProps {
  menuItem: Item;
}

const MenuCard = ({ menuItem }: MenuCardProps) => {
  return (
    <div className="border rounded p-3 w-[49%] mb-3">
      <h3 className="font-bold text-lg">{menuItem.name}</h3>
      <p className="font-light mt-1 text-sm">{menuItem.description}</p>
      <p className="mt-7">{menuItem.price}</p>
    </div>
  );
};

export default MenuCard;
