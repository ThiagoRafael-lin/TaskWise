"use client";
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
// import api from "@/config/axios";

export default function TaskCreation() {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  // interface taskResponse {
  //   startDate: string;
  //   endDate: string;
  // }

  // async function fetchTask(e: React.FormEvent) {
  //   e.preventDefault();

  //   try {
  //     const response = await api.post<taskResponse>("/Task", {
  //       startDate,
  //       endDate,
  //     });

  //     console.log("task criada com sucesso");
  //   } catch (error) {
  //     console.log("Erro na criação de tasks", error);
  //   }
  // }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center bg-zinc-200 w-96 h-60 rounded-4xl">
        <div className="flex items-end justify-center gap-8 w-full h-full ">
          <Popover>
            <div className="flex flex-col items-start ">
              <h2>Start Data:</h2>
              <PopoverTrigger>
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
        <div className=" w-full h-full flex items-center justify-center ">
          <Button className="w-24">Create Task</Button>
        </div>
      </div>
    </div>
  );
}
