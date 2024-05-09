import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold text-white">
      <div>status quo</div>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default NavBar;
