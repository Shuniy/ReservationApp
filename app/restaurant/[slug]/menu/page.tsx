import React from "react";
import Header from "../components/Header";
import RestaurantNavbar from "../components/RestaurantNavbar";
import Menu from "../components/Menu";
import { Item } from "@prisma/client";
import prisma from "../../../../helpers/PrismaHelper";

const fetchMenuByRestaurant = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurant) {
    throw new Error("Something went Wrong");
  }
  return restaurant.items;
};

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  const menu: Item[] = await fetchMenuByRestaurant(params.slug);
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavbar slug={params.slug} />
      <Menu menu={menu} />
    </div>
  );
};

export default RestaurantMenu;
