"use client";
import { cn } from "../app/utils/cn";
import React from "react";
import { BentoGrid, AccomplishmentsGridItem } from "./AccomplishmentsGrid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function AccomplishmentsLayout() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] mt-5">
      {items.map((item, i) => (
        <AccomplishmentsGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonOne = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <Image
        src="/certificate/google-it-support-professional-certificate.png"
        alt="avatar"
        height="100"
        width="100"
        className="rounded-full h-80 w-80"
      />
    </motion.div>
  );
};
const SkeletonTwo = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <Image src="/certificate/google-cloud-computing-foundations-certificate.png" 
      alt="avatar"
      height="100"
      width="100"
      className="rounded-full h-96 w-80" />
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <motion.div className="h-full w-full rounded-lg">
        <Image
          src="/certificate/certificate-load-balancing.png"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-lg h-36 w-56"
        />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: (
      <span className="text-md">
        Google IT Support Professional Badge
      </span>
    ),
    description: (
      <Link href="https://www.credly.com/badges/04d46c4d-127b-4fb1-8d75-893f91c6cdda/public_url" className="
      text-sm text-blue-500 hover:text-blue-600
      ">
        <span className="text-sm">View Credentials</span>
      </Link>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Google Cloud Computing Foundations Badge",
    description: (
      <Link href="https://www.credly.com/badges/5541dfd4-f792-4257-a847-86a532c37ab4/public_url" className="
      text-sm text-blue-500 hover:text-blue-600
      ">
        <span className="text-sm">View Credentials</span>
      </Link>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Implement Load Balancing on Compute Engine Skill Badge",
    description: (
      <Link href="https://www.credly.com/badges/b82a6a3a-61f6-4ce4-b10e-51b5792212d1/public_url" className="
      text-sm text-blue-500 hover:text-blue-600
      ">
        <span className="text-sm">View Credentials</span>
      </Link>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
];
