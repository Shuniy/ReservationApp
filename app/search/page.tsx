import React from "react";
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import prisma from "../../helpers/PrismaHelper";

const fetchLocations = async () => {
  return prisma.location.findMany();
};

const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
};

export interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const fetchRestaurantByCity = async (searchParams: SearchParams) => {
  const where: any = {};
  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city?.toLowerCase(),
      },
    };
    where.location = location;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine?.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };
  return await prisma.restaurant.findMany({
    select: select,
    where: where,
  });
};

const Search = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurants = await fetchRestaurantByCity(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => {
              return (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              );
            })
          ) : (
            <p>Sorry! No Restaurants found in the area.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
