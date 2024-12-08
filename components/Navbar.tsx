'use client';

import React, { useState, useEffect } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { RiHomeLine } from 'react-icons/ri';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoCloseOutline } from 'react-icons/io5';

const navlinks = [
  { id: 1, icon: '/home.svg', href: '/' },
  { id: 2, name: 'Work', href: '/work' },
  { id: 3, name: 'About', href: '/about' },
  { id: 4, name: 'Contact', href: '/contact' },
  { id: 5, name: 'Resume', href: '/resume' },
];

const Navbar = () => {
  const [position, setPosition] = useState('bottom');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // UseEffect to set isClient to true after the component is mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/*MOBILE NAV*/}
      <div className={`flex items-center justify-between mx-6 mt-6 md:hidden overflow-x-hidden`}>
        <Link href="/">
          <div className={`bg-foreground w-12 h-12 cursor-pointer rounded-full items-center justify-center flex`}>
            <RiHomeLine className={`w-8 h-8 text-gray-500`} />
          </div>
        </Link>
        <DropdownMenu onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger>
            <div className={`bg-foreground w-12 h-12 cursor-pointer rounded-full items-center justify-center flex`}>
              {isClient &&
                (menuOpen ? (
                  <IoCloseOutline className={`w-8 h-8 text-gray-500`} />
                ) : (
                  <IoMdMenu className={`w-8 h-8 text-gray-500`} />
                ))}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`w-56 mr-10 rounded-xl shadow-gray-400 bg-foreground`}>
            <DropdownMenuLabel className={`text-lg`}>Robotto Production</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              {navlinks.map((link) =>
                link.name ? (
                  <Link href={link.href} key={link.id} className={`font-semibold uppercase`}>
                    <DropdownMenuRadioItem value={link.name} key={link.id}>
                      {link.name}
                    </DropdownMenuRadioItem>
                  </Link>
                ) : (
                  <DropdownMenuRadioItem key={link.id} value="icon-only">
                    <Link href="/" className={`w-full`}>
                      <div className="flex items-center justify-start">
                        <RiHomeLine className={`w-7 h-7 text-gray-500`} />
                      </div>
                    </Link>
                  </DropdownMenuRadioItem>
                )
              )}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/*PROPER NAV*/}
      <nav className="justify-center items-center hidden md:flex mt-6 mx-12 lg:mx-28 bg-foreground rounded-full py-2.5">
        <ul className="flex items-center mr-32">
          <li key="icon" className="flex items-center">
            <Link href="/" className="flex items-center justify-center px-4">
              <RiHomeLine className="w-7 h-7 text-gray-500" />
            </Link>
          </li>
        </ul>
        <ul className="flex items-center justify-center space-x-28 mr-12">
          {/* Text Links */}
          {navlinks
            .filter((link) => link.id !== 1)
            .map((link) => (
              <li key={link.id}>
                <Link href={link.href} className="text-base uppercase font-semibold text-[#393535]">
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
