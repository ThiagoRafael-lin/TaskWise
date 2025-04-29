/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  /*CardTitle*/
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import api from "@/config/axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  interface LoginResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
    };
  }

  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError("");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const isValidEmail = (email: string): boolean => {
    // Expressão regular para validar o formato do e-mail (simples)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function fetchRegister() {
    console.log("Iniciando requisição de registro");

    let isValid = true;

    if (!name.trim()) {
      setNameError("Please enter your name.");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      isValid = false;
    }

    if (email.trim() && !isValidEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      isValid = false;
    }

    try {
      const response = await api.post("/Conta/Register", {
        name: name,
        email: email,
        password: password,
      });

      console.log("Registro feito com sucessso", response);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Erro na requisição de registro", error);
    }
  }

  async function fetchLogin(e: React.FormEvent) {
    e.preventDefault();
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      isValid = false;
    }

    if (email.trim() && !isValidEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      isValid = false;
    }

    console.log("requisição iniciada");

    if (isValid) {
      try {
        console.log("metade");

        const response = await api.post<LoginResponse>("/Conta/Login", {
          email,
          password,
        });

        const { token } = response.data;

        localStorage.setItem("token", token);

        router.push("home-screen");

        console.log("passo", response);
      } catch (error: any) {
        console.log("Erro na requisição de Login", error.response);

        if (error.response && error.response.data) {
          if (error.response.status === 401) {
            setPasswordError("Incorrect email or password");
          }
        }
      }
    }
  }

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account" className="hover:bg-gray-200">
          Login
        </TabsTrigger>
        <TabsTrigger value="password" className="hover:bg-gray-200">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            {/* <CardTitle>Account</CardTitle> */}
            <CardDescription>
              Enter your access data in the fields below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                placeholder="Ex: fernando@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input
                id="username"
                type="password"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="border bg-white text-black hover:bg-gray-200 active:bg-gray-400"
              onClick={fetchLogin}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardHeader>
            {/* <CardTitle>Password</CardTitle> */}
            <CardDescription>
              If you don&apos;t have an account, create one now!.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Name</Label>
              <Input
                id="current"
                type="name"
                placeholder="Ex: Fernando"
                value={name}
                onChange={handleNameChange}
                required
              />
              {nameError && <p style={{ color: "red" }}>{nameError}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Email</Label>
              <Input
                id="new"
                type="email"
                placeholder="Ex: Fernando@gmail.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input
                id="new"
                type="password"
                placeholder="******"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </CardContent>
          <CardFooter>
            <Button
              onClick={fetchRegister}
              className="border border-gray-500 hover:bg-gray-900 active:bg-gray-800"
            >
              Create account
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
