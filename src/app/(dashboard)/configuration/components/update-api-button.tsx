import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import axios from "axios";
import { API_URL, HOST } from "@/lib/config";
import { FaNetworkWired } from "react-icons/fa";

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

export default function UpdateApiButton() {
  const apiInput: any = useRef(null);
  const closeRef: any = useRef(null);

  const { toast } = useToast();

  async function handleUpdateFromCloud() {
    try {
      await requests.post("/update/solution/auto");
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

  async function onChangeFileInput(e: any) {
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append("file", file);

    try {
      const res = await requests.post("/update/solution", formData);
      toast({
        variant: "success",
        title: "API updated succesfully!",
      });
      console.log("RES: ", res);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong. Try again!",
      });
      console.log(e);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="font-bold flex justify-center items-center h-10 px-[1rem] text-[0.7rem] cursor-pointer    text-slate-50 bg-green-950 hover:bg-green-900 transition-all border-solid border border-white border-opacity-10 rounded-sm backdrop-blur-sm">
          <FaNetworkWired className="text-slate-50 text-[1.2rem]" />
          <p className="ml-[0.5rem]">UPDATE API</p>

          <Input
            ref={apiInput}
            type="file"
            name="updateAPI"
            id="updateAPI"
            onChange={onChangeFileInput}
            accept=".exe"
            className="hidden"
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 border-none overflow-hidden rounded w-[23rem]">
        <div className=" flex gap-2 items-center text-sm font-bold px-5 text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-14">
          <FaNetworkWired className="text-slate-50 text-[1.2rem]" /> UPDATE
          ALGORITHM
        </div>
        <div className="p-5 ">
          <div className="flex gap-3 w-full justify-between">
            <Button
              onClick={
                apiInput
                  ? () => {
                      apiInput.current.click();
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
        <AlertDialogCancel ref={closeRef} className="hidden" />
      </AlertDialogContent>
    </AlertDialog>
  );
}
