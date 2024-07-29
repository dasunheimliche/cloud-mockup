"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import axios from "axios";
import { HOST } from "@/lib/config";
import { GiBrain } from "react-icons/gi";

import { useToast } from "@/components/ui/use-toast";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const requests = axios.create({
  baseURL: `${HOST}5500`,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    "Content-Type": "multipart/form-data",
    "ngrok-skip-browser-warning": "uwu",
  },
});

export default function UpdateAlgorithmButton() {
  const algorithmInput: any = useRef(null);

  const { toast } = useToast();

  async function handleUpdateFromCloud() {
    try {
      await requests.post("/update/algorithm/auto");
      toast({
        variant: "success",
        title: "ALGORITHM updated succesfully!",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong. Try again!",
      });
    }
  }

  async function onChangeAlgorithmInput(e: any) {
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append("file", file);

    try {
      const res = await requests.post("/update/algorithm", formData);
      console.log("RES: ", res);
      toast({
        variant: "success",
        title: "ALGORITHM updated succesfully!",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong. Try again!",
      });
      console.log(e);
    }
  }

  const closeRef: any = useRef(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="font-bold flex justify-center items-center h-10 px-[1rem] text-[0.7rem] cursor-pointer    text-slate-50 bg-green-950 hover:bg-green-900 transition-all border-solid border border-white border-opacity-10 rounded-sm backdrop-blur-sm">
          <GiBrain className="text-slate-50 text-[1.2rem]" />
          <p className="ml-[0.5rem]">UPDATE ALGORITHM</p>

          <Input
            ref={algorithmInput}
            type="file"
            name="update algorithm"
            id="updateAlgorithm"
            onChange={onChangeAlgorithmInput}
            accept=".exe"
            className="hidden"
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 border-none overflow-hidden rounded w-[23rem]">
        <div className=" flex gap-2 items-center text-sm font-bold px-5 text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-14">
          <GiBrain className="text-slate-50 text-[1.2rem]" /> UPDATE ALGORITHM
        </div>
        <div className="p-5 ">
          <div className="flex gap-3 w-full justify-between">
            <Button
              onClick={
                algorithmInput
                  ? () => {
                      algorithmInput.current.click();
                      if (closeRef.current) {
                        closeRef.current.click();
                      }
                    }
                  : undefined
              }
              className="font-bold w-full flex justify-center items-center h-10 px-[1rem] text-[0.7rem] cursor-pointer text-slate-50 bg-green-950 hover:bg-green-900 transition-all border-solid border border-white border-opacity-10 rounded-sm backdrop-blur-sm"
            >
              UPLOAD FILE
            </Button>
            <Button
              onClick={async () => {
                await handleUpdateFromCloud();
                if (closeRef.current) {
                  closeRef.current.click();
                }
              }}
              className="font-bold w-full flex justify-center items-center h-10 px-[1rem] text-[0.7rem] cursor-pointer text-slate-50 bg-green-950 hover:bg-green-900 transition-all border-solid border border-white border-opacity-10 rounded-sm backdrop-blur-sm"
            >
              CLOUD UPDATE
            </Button>
          </div>

          <AlertDialogFooter className="mt-3">
            <AlertDialogCancel
              className="px-3 bg-red-600 rounded-none text-white hover:bg-red-700 hover:text-white"
              ref={closeRef}
            >
              {" "}
              CANCEL{" "}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
