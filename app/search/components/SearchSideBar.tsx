import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { SearchParams } from "../page";

const SearchSideBar = async ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: SearchParams;
}) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg text-center font-light rounded-l p-2",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className: "border w-full text-reg text-center font-light p-2",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "border w-full text-reg text-center font-light rounded-r p-2",
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Regions</h1>
        {locations.map((location) => {
          return (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  city: location.name,
                },
              }}
              key={location.id}
              className="font-light capitalize text-reg"
            >
              {location.name}
            </Link>
          );
        })}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisines</h1>
        {cuisines.map((cuisine) => {
          return (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  cuisine: cuisine.name,
                },
              }}
              key={cuisine.id}
              className="font-light capitalize text-reg"
            >
              {cuisine.name}
            </Link>
          );
        })}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map((price) => {
            return (
              <Link
                key={price.label}
                href={{
                  pathname: "/search",
                  query: {
                    ...searchParams,
                    price: price.price,
                  },
                }}
                className={price.className}
              >
                {price.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
