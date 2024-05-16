import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { memo } from "react";

const NavBar = memo(function NavBar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="mx-3 flex-1">
        <Link href={"/"} className="text-xl">
          status quo
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <div className="indicator">
              <span className="badge indicator-item badge-sm">8</span>
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
    </nav>
  );
});
export default NavBar;
