import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MdVideoSettings } from "react-icons/md";
import Image from "next/image";

export default function StartConfigHeader({ icon, label, tutorialUrl }: any) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center justify-between text-sm font-bold text-[1.12rem] px-5 text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-20",
        "fixed inset-0 px-10 z-30"
      )}
    >
      <div className="flex gap-2 items-center">
        {icon} {label}
      </div>

      <div className="absolute left-1/2 top-7 opacity-80 max-md:hidden flex flex-col gap-1 items-center">
        <Image
          width={36}
          height={20}
          className={cn("w-10 select-none ")}
          alt="eva logo"
          src={"/imgs/eva-white.png"}
        />
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <div>
            <MdVideoSettings size={"1.25rem"} className="cursor-pointer" />
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 border-none bg-transparent shadow-none outline-none max-md:w-full flex justify-center items-center">
          {/* <iframe
            className="w-[480px] h-[270px] max-md:w-full "
            src={tutorialUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe> */}
          <video className="min-w-[40rem] max-md:min-w-full" controls>
            <source src={tutorialUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </DialogContent>
      </Dialog>
    </div>
  );
}
