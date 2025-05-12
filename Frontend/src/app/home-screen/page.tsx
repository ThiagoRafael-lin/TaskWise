"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// import { Card } from "@/components/card";
import Image from "next/image";
import IMGAddtask from "@/assets/img/ImageAddTask.png";
import { useRouter } from "next/navigation";

export default function HomeScreen() {
  const [userName, setUserName] = useState("");
  const welcomeRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
      localStorage.removeItem("userName");
    } else {
      console.log("nome não encontrado");
    }
    const tl = gsap.timeline({ defaults: { duration: 0.7 } });

    const welcome = welcomeRef.current;
    const main = mainRef.current;

    tl.fromTo(welcome, { opacity: 0, y: 100 }, { opacity: 1, y: 0 })
      .to(welcome, {
        opacity: 0,
        y: 0,
        delay: 1,
        onComplete: () => {
          if (main) {
            gsap.to(main, { opacity: 1, y: 1, duration: 0.5 });
          }
        },
      })
      .fromTo(main, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });
  }, []);

  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        ref={welcomeRef}
        className="flex items-center justify-center h-screen"
      >
        <p className="text-5xl font-comfortaa">
          Hello <span className="text-blue-500">{userName}</span>
        </p>
      </div>
      <div
        ref={mainRef}
        className="absolute opacity-0 flex flex-col items-center justify-center"
      ></div>
      <div className="absolute right-4 bottom-2">
        <button
          className="w-16 h-16 bg-black rounded-full items-center flex justify-center cursor-pointer"
          onClick={() => {
            router.push("taskCreation-screen");
          }}
        >
          <Image src={IMGAddtask} alt="" width={35} className="" />
        </button>
      </div>
    </div>
  );
}
