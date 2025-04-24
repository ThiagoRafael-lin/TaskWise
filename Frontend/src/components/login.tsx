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

export const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  async function fetchLogin() {
    console.log("requisição iniciada");

    try {
      console.log("metade");

      const response = await api.get("/Conta/Login");

      console.log("passo");

      console.log(response);
    } catch (error) {
      console.log("Erro na requisição de Login", error);
    }
  }

  async function fetchRegister() {
    console.log("Iniciando requisição de registro");

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

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 bg-gray-900">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Register</TabsTrigger>
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
              <Input id="name" placeholder="Ex: Fernando@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input id="username" placeholder="******" />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="border border-gray-500 hover:bg-gray-900 active:bg-gray-800"
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
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Email</Label>
              <Input
                id="new"
                type="email"
                placeholder="Ex: Fernando@gmail.com"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input
                id="new"
                type="password"
                placeholder="******"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
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
