"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function TopNavigationBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        // User is scrolling down
        setVisible(false);
      } else {
        // User is scrolling up
        setVisible(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`bg-white py-4 px-6 fixed top-0 left-0 right-0 z-10 shadow-md transition-transform ${
        visible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 relative">
          <Image src="/images/logo.png" alt="Logo" height={75} width={75} />
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-base font-medium text-gray-900 hover:text-gray-600"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-gray-900 hover:text-gray-600"
            prefetch={false}
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-gray-900 hover:text-gray-600"
            prefetch={false}
          >
            Events
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white rounded-md overflow-hidden border border-gray-300">
            <Input
              type="search"
              placeholder="Search"
              className="pl-4 pr-2 py-2 w-full"
            />
            <Button variant="ghost" className="p-2">
              <SearchIcon className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
          <Button variant="ghost" className="p-2">
            <ShoppingCartIcon className="h-5 w-5 text-gray-900" />
          </Button>
          <Button variant="ghost" className="p-2">
            <UserIcon className="h-5 w-5 text-gray-900" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
