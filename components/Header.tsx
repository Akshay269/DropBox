import Link from "next/link";
import React from "react";
import Image from "next/image";
import { UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import { ThemeToggler } from "./ThemeToggler";

function Header() {
  return (
    <header className="flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-[#0160FC] w-fit">
          <Image
            src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png"
            alt="Logo"
            className="invert"
            width={50}
            height={50}
          />
        </div>
        <h1 className="font-bold text-xl">DropBox</h1>
      </Link>

      <div className="px-5 flex space-x-2 items-center">

        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />

        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
