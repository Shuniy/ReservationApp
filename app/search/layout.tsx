import type { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Search | Open Table",
  description: "Generated by create next app",
};

const SearchLayout = ({children, }: {children: ReactNode}) => {
  return (
    <>
        {children}
    </>
  )
}

export default SearchLayout;