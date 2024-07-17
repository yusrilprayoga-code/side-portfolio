"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ThreeDCardLayout";
import Link from "next/link";

export function ThreeDCardDemo() {
  return (
    <div>
      <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          The Complete 2024 Web Development Bootcamp
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
            Learn to build websites, web apps, and APIs with Node.js, Express, SQL, ReactJs
            MongoDB, and more.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://udemy-certificate.s3.amazonaws.com/image/UC-eb27df0f-6915-40e2-83ed-b3b6b069073c.jpg"
            height="1000"
            width="1000"
            className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="https://www.udemy.com/certificate/UC-eb27df0f-6915-40e2-83ed-b3b6b069073c/"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Show Credentials -&gt;
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Bangkit Academy 2024 By Google, GoTo, Traveloka - Cloud Computing Learning Path 
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
            Learn to build Apps, Machine Learning, and Cloud Computing with Google Cloud Platform, GoTo, and Traveloka.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="/certificate/certificate-bangkit.png"
            height="1000"
            width="1000"
            className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="/certificate/certificate-bangkit.png"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Show Credentials -&gt;
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    </div>
  );
}
