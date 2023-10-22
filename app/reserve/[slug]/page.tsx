import React from "react";
import Header from "./components/Header";
import { notFound } from "next/navigation";
import Form from "./components/Form";
import prisma from "@/helpers/PrismaHelper";

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const ReserveRestaurant = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          image={restaurant.main_image}
          name={restaurant.name}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
        <Form
          slug={restaurant.slug}
          partySize={searchParams.partySize}
          date={searchParams.date}
        />
      </div>
    </div>
  );
};

export default ReserveRestaurant;
