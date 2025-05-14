"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import api from "@/config/axios";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function TaskCreation() {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [description, setDescription] = useState("");

  interface taskResponse {
    startDate: string;
    endDate: string;
  }

  async function fetchTask(e: React.FormEvent) {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Insira as datas");
      return;
    }

    try {
      console.log("inicio a requisição");

      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      const formattedEndDate = format(endDate, "yyyy-MM-dd");

      const response = await api.post<taskResponse>("/Task", {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        description,
      });

      console.log("task criada com sucesso", response.data);
    } catch (error) {
      console.log("Erro na criação de tasks", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center bg-zinc-200 w-96 h-96 rounded-4xl">
        <div className="flex items-center justify-center gap-8 w-full h-full ">
          <Popover>
            <div className="flex flex-col items-start ">
              <h2>Start Data:</h2>
              <PopoverTrigger asChild>
                <Button>
                  <CalendarIcon />{" "}
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </div>
          </Popover>

          <Popover>
            <div className="flex flex-col items-start ">
              <h2>End Data:</h2>
              <PopoverTrigger>
                <Button>
                  <CalendarIcon />{" "}
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </div>
          </Popover>
        </div>
        <div>
          <Label className="w-80 mt-4 mb-1">Description</Label>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-80 border-black h-44"
          />
        </div>
        <div className=" w-full h-full flex items-center justify-center ">
          <Button
            onClick={fetchTask}
            disabled={!startDate || !endDate || !description}
            className="w-24"
          >
            Create Task
          </Button>
        </div>
      </div>
    </div>
  );
}
