"use client";
import React, { useState, useRef, useEffect } from "react";
import { CertificatePage } from "./CertificatePage";

export function CertificateLayout() {
  return (
    <div className="h-screen py-20 w-full">
      <CertificatePage cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Google IT Support</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        This certificate is designed to help you prepare for a role as an entry
        level IT support specialist. It is a great way to start your career in
        IT
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Operating Systems and You: Becoming a Power User</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        In this course -- through a combination of video lectures, demonstrations, and hands-on practice
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">IT Security: Defense against the digital dark arts</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        This course covers a wide variety of IT security concepts, tools, and best practices. It introduces threats and attacks and the many ways they can show up.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">System Administration and IT Infrastructure Services</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        This course will transition you from working on a single computer to an entire fleet. Systems administration is the field of IT that’s responsible for maintaining reliable computers systems in a multi-user environment.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "/certificate/certificate-it-support.png",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/certificate/certificate-becoming-a-power-user.png",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/certificate/certificate-it-security.png",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/certificate/certificate-system-administration.png",
  },
];
