"use client";
import React from "react";
import Image from "next/image";
import LittleProfile from "@/assets/img/moritz.jpg";
import { useState } from "react";

interface CardType {
  startDate: string;
  endDate: string;
  description: string;
}

export const Card = ({ startDate, endDate, description }: CardType) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    console.log(isExpanded);
  };
  return (
    <div
      className="bg-gray-200 hover:bg-gray-500 border w-80 py-4 flex flex-col justify-center items-start rounded-md overflow-hidden"
      onClick={toggleExpansion}
    >
      <div className=" flex items-center justify-center cursor-pointer h-full ">
        <Image
          src={LittleProfile}
          alt=""
          width={35}
          className="rounded-full ml-3"
        />
        <div className="font-comfortaa text-[12px] flex justify-center items-center pl-4 gap-5 w-full h-full">
          <p>Start: {startDate}</p>
          <p>End: {endDate}</p>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {description && (
          <p className="text-gray-700 break-all px-6 pt-4">{description}</p>
        )}
      </div>
    </div>
  );
};
