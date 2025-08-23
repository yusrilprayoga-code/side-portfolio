"use client";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { socials } from "@/constants/socials";
import { Badge } from "./Badge";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse } from "@tabler/icons-react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import SplashCursor from "@/blocks/Animations/SplashCursor/SplashCursor";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  const width = window.innerWidth;
  return width <= 1024;
};

export const Sidebar = () => {
  const [open, setOpen] = useState(isMobile() ? false : true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
    localStorage.setItem("darkMode", !darkMode ? "true" : "false");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            exit={{ x: -200 }}
            className="px-6 z-[100] py-10 bg-neutral-100 dark:bg-neutral-900 max-w-[14rem] lg:w-fit fixed lg:relative h-screen left-0 flex flex-col justify-between overflow-y-auto"
          >
            <div className="">
              <SidebarHeader />
              <Navigation setOpen={setOpen} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            </div>
            <Badge href="/resume" text="Read Resume" />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="fixed lg:hidden bottom-4 right-4 h-8 w-8 border border-neutral-200 dark:border-neutral-700 rounded-full backdrop-blur-sm flex items-center justify-center z-10"
        onClick={() => setOpen(!open)}
      >
        <IconLayoutSidebarRightCollapse className="h-4 w-4 text-secondary dark:text-neutral-400" />
      </button>
    </>
  );
};

export const Navigation = ({
  setOpen,
  toggleDarkMode,
  darkMode,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDarkMode: () => void;
  darkMode: boolean;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-10 relative z-[100]">
      {/* <SplashCursor /> */}
      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-secondary dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-white dark:bg-neutral-800 shadow-lg text-primary dark:text-gray-200"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-10 px-2 dark:text-neutral-400">
        Socials
      </Heading>
      {socials.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          className={twMerge(
            "text-secondary dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <button
        onClick={toggleDarkMode}
        className="text-secondary dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm"
      >
        {darkMode ? (
          <IconSun className="h-4 w-4 flex-shrink-0 mr-2" />
        ) : (
          <IconMoon className="h-4 w-4 flex-shrink-0 mr-2" />
        )}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

const SidebarHeader = () => {
  return (
    <div className="flex space-x-2">
      <Image
        src="/images/yusril.png"
        alt="Avatar"
        height="40"
        width="40"
        className="object-cover object-top rounded-full flex-shrink-0"
      />
      <div className="flex text-sm flex-col">
        <p className="font-bold text-primary dark:text-gray-200">Yusril Prayoga</p>
        <p className="font-light text-secondary dark:text-neutral-400">Developer</p>
      </div>
    </div>
  );
};
