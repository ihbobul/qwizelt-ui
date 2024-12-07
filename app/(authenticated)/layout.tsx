/* eslint-disable no-use-before-define */

"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  IconArrowLeft,
  IconBrandTabler,
  IconQuestionMark,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { ListIcon } from "lucide-react";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="icon-class" />,
    },
    {
      label: "Create New Question",
      href: "/question-factory",
      icon: <IconQuestionMark className="icon-class" />,
    },
    {
      label: "Question List",
      href: "/questions",
      icon: <ListIcon className="icon-class" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="icon-class" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="icon-class" />,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <IconArrowLeft className="icon-class" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden relative">
      {/* Sidebar Wrapper */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col h-full">
          {/* Sidebar Top Section */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {/* Sidebar Footer Section */}
          <div className="p-4 border-t">
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    className="rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content with background */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-r from-indigo-50 via-gray-100 to-indigo-50 relative z-10">
        {/* Background blur lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-gray-100 to-indigo-50 opacity-70 blur-xl z-0"></div>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

// Logo Component
export const Logo = () => (
  <Link
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      Qwizelt
    </motion.span>
  </Link>
);

// LogoIcon Component (Collapsed Sidebar Logo)
export const LogoIcon = () => (
  <Link
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
  </Link>
);

export default SidebarLayout;
