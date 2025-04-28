import React from "react";
import { Login } from "@/components/login";
import BackgroundImage from "@/assets/img/ImageBackgroundLogin.jpg";
import Image from "next/image";

export default function LoginScreen() {
  return (
    <div className="relative h-screen flex justify-center items-center overflow-hidden">
      <Image
        src={BackgroundImage}
        alt=""
        fill
        className="object-cover"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">
        <Login />
      </div>
    </div>
  );
}
