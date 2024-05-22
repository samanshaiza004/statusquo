import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { memo } from "react";

const NavBar = memo(function NavBar() {
  return (
    <nav className=" w-full border-b md:border-0">
      <div className="mx-auto max-w-screen-xl items-center px-4 md:flex md:px-8">
        <div className="mx-3 flex-1">
          <Link href={"/"} className="text-xl">
            <h1>status quo</h1>
          </Link>
        </div>
        <div className="flex-none">
          <div className="">
            <div tabIndex={0} role="button" className="">
              <div className="">
                <span className="">8</span>
              </div>
            </div>
          </div>
          <div className="mx-3">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
});
export default NavBar;
