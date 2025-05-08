'use client';
import React from 'react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { usePathname } from 'next/navigation';
import {motion} from "motion/react"
import { easeIn } from 'framer-motion';

export const SidebarItems = ({
  items,
  isCollapsed,
  setIsCollapsed,
}: {
  items: {
    id: number;
    name: string;
    Component: any;
    href: string;
  }[];
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}) => {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                initial={{opacity:0, y:0,filter:"blur(10px)"}}
                animate={{opacity:1, y:0,filter:"blur(0px)"}}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsCollapsed(true)}
                    className={`flex items-center rounded-lg p-3 text-center transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600/15 text-blue-500'
                        : 'hover:bg-blue-600/5 hover:text-blue-500'
                    } ${isCollapsed ? 'justify-center' : 'gap-2'}`}
                  >
                    <item.Component />
                    {!isCollapsed && (
                      <motion.span 
                      initial={{opacity:0, y:0,filter:"blur(10px)"}}
                      animate={{opacity:1, y:0,filter:"blur(0px)"}}
                      transition={{duration:0.3, ease:easeIn}}
                      className="text-lg font-medium tracking-tight">
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" sideOffset={4}>
                  <p>{item.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </>
  );
};
