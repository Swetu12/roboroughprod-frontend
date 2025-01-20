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
import { IoCloseOutline, IoMenu } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { fetchNavbarLinks } from '@/app/api/fetchData';

const navlinks = [
  { id: 1, icon: '/home.svg', href: '/' },
  { id: 2, name: 'Work', href: '#work' },
  { id: 3, name: 'About', href: '#about' },
  { id: 4, name: 'Contact', href: '#contact' },
  { id: 5, name: 'Resume', href: '#resume' },
];

interface NavLink {
  id: number;
  name: string;
  href: string;
}

const Navbar = () => {
  const [position, setPosition] = useState('bottom');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [navlinks, setNavlinks] = useState<NavLink[]>([]);

  useEffect(() => {
    const getNavbarData = async () => {
      try {
        const links = await fetchNavbarLinks();
        setNavlinks(links);
      } catch (error) {
        console.error(error);
      }
    };
    getNavbarData();
  }, []);

  const handleLinkClick = (href: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else if (href === '/') {
      window.location.href = href;
    }
  };

  return (
    <>
      {/* MOBILE NAV */}
      <motion.div className="flex items-center justify-between mx-6 mt-6 md:hidden">
        <Link href="/">
          <motion.div className="bg-foreground w-12 h-12 cursor-pointer rounded-full flex items-center justify-center">
            <RiHomeLine className="w-8 h-8 text-gray-500" />
          </motion.div>
        </Link>
        <DropdownMenu onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger>
            <motion.div className="bg-foreground w-12 h-12 cursor-pointer rounded-full flex items-center justify-center">
              {menuOpen ? (
                <IoCloseOutline className="w-8 h-8 text-gray-500" />
              ) : (
                <IoMenu className="w-8 h-8 text-gray-500" />
              )}
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-xl shadow-gray-400 bg-foreground">
            <DropdownMenuLabel className="text-lg ml-5">Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              {navlinks.map((link) => (
                <DropdownMenuRadioItem key={link.id} value={link.name}>
                  <button onClick={(event) => handleLinkClick(link.href, event)} className="font-semibold uppercase">
                    {link.name}
                  </button>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {/* DESKTOP NAV */}
      <motion.nav className="sticky top-5 z-50 hidden md:flex justify-center items-center bg-foreground rounded-full py-2.5 shadow-md">
        <motion.ul className="flex items-center mr-32">
          <motion.li>
            <Link href="/" className="flex items-center justify-center px-4">
              <RiHomeLine className="w-7 h-7 text-gray-500" />
            </Link>
          </motion.li>
        </motion.ul>
        <motion.ul className="flex items-center justify-center space-x-28">
          {navlinks.map((link) => (
            <motion.li key={link.id} className="group">
              <button
                onClick={(event) => handleLinkClick(link.href, event)}
                className="text-base uppercase font-semibold text-[#393535]"
              >
                {link.name}
              </button>
              <motion.div className="absolute left-0 bottom-[-2px] h-[2px] bg-black w-0 group-hover:w-full transition-all duration-300" />
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    </>
  );
};

export default Navbar;
