// import Image from "next/image";
import React from "react";
// import ImageBackgroundLogin from "@/assets/img/ImageBackgroundLogin.jpg";
import { Login } from "@/components/login";

export default function LoginScreen() {
  return (
    <div className="h-screen bg-[url(@/assets/img/ImageBackgroundLogin.jpg)] bg-[length:150%] bg-no-repeat bg-center flex justify-center items-center">
      <Login />
    </div>
  );
}
