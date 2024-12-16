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
import axios from 'axios';
import { motion } from 'framer-motion';
import { fetchNavbarLinks } from '@/app/api/fetchData';

const navlinks = [
  { id: 1, icon: '/home.svg', href: '/' },
  { id: 2, name: 'Work', href: '#work' }, // Change href to anchor link
  { id: 3, name: 'About', href: '#about' }, // Change href to anchor link
  { id: 4, name: 'Contact', href: '#contact' }, // Change href to anchor link
  { id: 5, name: 'Resume', href: '#resume' }, // Change href to anchor link
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
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''; // Get current path

  // UseEffect to set isClient to true after the component is mounted on the client
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

  const handleLinkClick = (href: string) => {
    if (currentPath === '/') {
      // On homepage: scroll to section
      if (href.startsWith('#')) {
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }
    } else {
      // If not on homepage, navigate to homepage first, then scroll to section
      window.location.href = '/'; // Redirect to homepage

      // Use setTimeout to allow page load and then scroll to the section
      setTimeout(() => {
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

  return (
    <>
      {/*MOBILE NAV*/}
      <motion.div className={`flex items-center justify-between mx-6 mt-6 md:hidden overflow-x-hidden`}>
        <Link href="/">
          <motion.div
            className={`bg-foreground w-12 h-12 cursor-pointer rounded-full items-center justify-center flex`}
          >
            <RiHomeLine className={`w-8 h-8 text-gray-500`} />
          </motion.div>
        </Link>
        <DropdownMenu onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger>
            <motion.div
              className={`bg-foreground w-12 h-12 cursor-pointer rounded-full items-center justify-center flex`}
            >
              {isClient &&
                (menuOpen ? (
                  <IoCloseOutline className={`w-8 h-8 text-gray-500`} />
                ) : (
                  <IoMdMenu className={`w-8 h-8 text-gray-500`} />
                ))}
            </motion.div>
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
                      <motion.div className="flex items-center justify-start">
                        <RiHomeLine className={`w-7 h-7 text-gray-500`} />
                      </motion.div>
                    </Link>
                  </DropdownMenuRadioItem>
                )
              )}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
      {/*PROPER NAV*/}
      <motion.nav className="sticky top-5 z-50 justify-center items-center hidden md:flex mt-6 mx-12 lg:mx-28 bg-foreground rounded-full py-2.5 shadow-md">
        <motion.ul className="flex items-center mr-32">
          <motion.li key="icon" className="flex items-center">
            <Link href="/" className="flex items-center justify-center px-4">
              <RiHomeLine className="w-7 h-7 text-gray-500" />
            </Link>
          </motion.li>
        </motion.ul>
        <motion.ul className="flex items-center justify-center space-x-28 mr-12">
          {navlinks
            .filter((link) => link.id !== 1)
            .map((link) => (
              <motion.li key={link.id} className="relative group" initial="initial" whileHover="hovered">
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className="text-base uppercase font-semibold text-[#393535]"
                >
                  {link.name}
                </button>
                <motion.div
                  className="absolute left-0 bottom-[-2px] h-[2px] bg-black w-0 group-hover:w-full transition-all duration-300"
                  layout
                />
              </motion.li>
            ))}
        </motion.ul>
      </motion.nav>
    </>
  );
};

export default Navbar;
