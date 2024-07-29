"use client";

import FormLabel from "@/components/form-label";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import ModalAccept from "@/components/ui/modal-accept";
import ModalClose from "@/components/ui/modal-close";
import authAxios from "@/lib/api";
import { cn } from "@/lib/utils";
import sessionStore from "@/stores/session-store";
import { useState } from "react";
import { IoMdCloudDownload } from "react-icons/io";

export default function DownloadSessionsModal({
  filter,
  filterInput,
  startDate,
  endDate,
}: {
  filter: any;
  filterInput: any;
  startDate: any;
  endDate: any;
}) {
  const [selectedOptions, setSelectedOptions] = useState<any>({
    chargerId: true,
    connectorId: true,
    username: true,
    rfidTagId: true,
    startTime: true,
    endTime: true,
    chargeTime: true,
    kwhConsumed: true,
    kwhPricing: true,
    totalCost: true,
  });
  const [loading, setLoading] = useState(false);
  const { token } = sessionStore();

  const handleOptionChange = (option: any) => {
    setSelectedOptions((prevState: any) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  async function donwloadSessions(
    token: string | null,
    filter?: string,
    filterInput?: string,
    startDate?: string,
    endDate?: string
  ) {
    if (!token) return;

    const options = `include_charger_id=${selectedOptions["chargerId"]}&include_connector_id=${selectedOptions["connectorId"]}&include_username=${selectedOptions["username"]}&include_tag_id=${selectedOptions["rfidTagId"]}&include_kwh_pricing=${selectedOptions["kwhPricing"]}&include_start_transaction=${selectedOptions["startTime"]}&include_stop_transaction=${selectedOptions["endTime"]}&include_total_charged_energy=${selectedOptions["kwhConsumed"]}&include_total_duration=${selectedOptions["chargeTime"]}&include_total_cost=${selectedOptions["totalCost"]}`;

    try {
      let res;

      if (filter === "all") {
        res = await authAxios.get(
          `/sessions/get/download?include_charger_id=${selectedOptions["chargerId"]}&include_connector_id=${selectedOptions["connectorId"]}&include_username=${selectedOptions["username"]}&include_tag_id=${selectedOptions["rfidTagId"]}&include_kwh_pricing=${selectedOptions["kwhPricing"]}&include_start_transaction=${selectedOptions["startTime"]}&include_stop_transaction=${selectedOptions["endTime"]}&include_total_charged_energy=${selectedOptions["kwhConsumed"]}&include_total_duration=${selectedOptions["chargeTime"]}&include_total_cost=${selectedOptions["totalCost"]}`,
          {
            headers: {
              Authorization: token,
            },
            responseType: "blob",
          }
        );
      } else if (filter === "user") {
        res = await authAxios.get(
          `/sessions/get/download?filter_type=user&username=${filterInput?.toLowerCase()}&${options}`,
          {
            headers: {
              Authorization: token,
            },
            responseType: "blob",
          }
        );
      } else if (filter === "charger") {
        res = await authAxios.get(
          `/sessions/get/download?filter_type=charger&charger_id=${filterInput}&${options}`,
          {
            headers: {
              Authorization: token,
            },
            responseType: "blob",
          }
        );
      } else if (filter === "tag_id") {
        res = await authAxios.get(
          `/sessions/get/download?filter_type=tag_id&tag_id=${filterInput}&${options}`,
          {
            headers: {
              Authorization: token,
            },
            responseType: "blob",
          }
        );
      } else if (filter === "date") {
        res = await authAxios.get(
          `/sessions/get/download?filter_type=date&tag_id=${filterInput}&start_date=${
            startDate + "T00:00:00.000"
          }&end_date=${endDate + "T23:59:59.123"}&${options}`,
          {
            headers: {
              Authorization: token,
            },
            responseType: "blob",
          }
        );
      }

      if (!res) return;

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const currentDate = new Date();
      const fileName = `Charging Sessions ${currentDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }
      )}.xlsx`;

      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.log(error);
      return [];
    }
  }

  return (
    <Modal className="w-[18rem]">
      <form action="" className="bg-white flex-col justify-start">
        <div className=" flex gap-2 items-center text-sm font-bold px-5  text-[#ffffffcb] bg-gradient-to-l from-[#01110b]  to-[#010618] w-full h-14">
          <IoMdCloudDownload size={"1.25rem"} /> PRINT SESSIONS
        </div>
        <div className="flex gap-[1.5rem] p-5 pb-0 w-full">
          <div className="flex  w-1/2 items-center justify-between">
            <FormLabel label="CHARGER ID" />
            <Input
              checked={selectedOptions["chargerId"]}
              onChange={() => handleOptionChange("chargerId")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
          <div className="flex   w-1/2 items-center  justify-between">
            <FormLabel label="CONNECTOR ID" />
            <Input
              checked={selectedOptions["connectorId"]}
              onChange={() => handleOptionChange("connectorId")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex gap-[1.5rem] p-5  pb-0 w-full">
          <div className="flex   w-1/2 items-center  justify-between">
            <FormLabel label="USERNAME" />
            <Input
              checked={selectedOptions["username"]}
              onChange={() => handleOptionChange("username")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
          <div className="flex  w-1/2 items-center  justify-between">
            <FormLabel label="RFID TAG ID" />
            <Input
              checked={selectedOptions["rfidTagId"]}
              onChange={() => handleOptionChange("rfidTagId")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex gap-[1.5rem] p-5 pb-0  w-full">
          <div className="flex  w-1/2 items-center  justify-between">
            <FormLabel label="START TIME" />
            <Input
              checked={selectedOptions["startTime"]}
              onChange={() => handleOptionChange("startTime")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
          <div className="flex   w-1/2 items-center  justify-between">
            <FormLabel label="END TIME" />
            <Input
              checked={selectedOptions["endTime"]}
              onChange={() => handleOptionChange("endTime")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex gap-[1.5rem] p-5 pb-0  w-full">
          <div className="flex  w-1/2 items-center  justify-between">
            <FormLabel label="CHARGE TIME" />
            <Input
              checked={selectedOptions["chargeTime"]}
              onChange={() => handleOptionChange("chargeTime")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
          <div className="flex   w-1/2 items-center  justify-between">
            <FormLabel label="KWH CONSUMED" />
            <Input
              checked={selectedOptions["kwhConsumed"]}
              onChange={() => handleOptionChange("kwhConsumed")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex gap-[1.5rem] p-5 pb-0  w-full">
          <div className="flex  w-1/2 items-center  justify-between">
            <FormLabel label="KWH PRICING" />
            <Input
              checked={selectedOptions["kwhPricing"]}
              onChange={() => handleOptionChange("kwhPricing")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
          <div className="flex   w-1/2 items-center  justify-between">
            <FormLabel label="TOTAL COST" />
            <Input
              checked={selectedOptions["totalCost"]}
              onChange={() => handleOptionChange("totalCost")}
              type="checkbox"
              className="w-3 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-end  gap-2 pr-5 pb-3 mt-7">
          <ModalClose onClick={() => {}} />

          <button
            type="button"
            className={cn(
              "flex justify-center rounded-full text-sm items-center font-semibold shadow-none h-4 w-24 py-5 bg-slate-950 text-zinc-50 hover:bg-slate-900 hover:text-zinc-50"
            )}
            onClick={() =>
              donwloadSessions(token, filter, filterInput, startDate, endDate)
            }
          >
            {!loading && "Download"}
            {loading && <div className="loader"></div>}
          </button>

          <ModalAccept
            // ref={closeRef}
            onClick={() => {}}
            label="Download"
            className="absolute opacity-0 -translate-x-[10000px] "
          />
        </div>
      </form>
    </Modal>
  );
}
