import React from "react";
import MenuCard from "./MenuCard";
import { Item } from "@prisma/client";

export interface MenuProps {
  menu: Item[];
}

const Menu = ({ menu }: MenuProps) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menu.length ? (
          <div className="flex flex-wrap justify-between">
            {menu.map((menuItem) => {
              return <MenuCard key={menuItem.id} menuItem={menuItem} />;
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>Please check again later, No menu provided!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Menu;
