"use client";

import Link from "next/link";
import React, { useContext } from "react";
import AuthModal from "./LoginModal";
import { AuthenticationContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className="flex">
            {data ? (
              <button
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                onClick={signout}
              >
                Signout
              </button>
            ) : (
              <>
                <AuthModal isSignin={true} />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
