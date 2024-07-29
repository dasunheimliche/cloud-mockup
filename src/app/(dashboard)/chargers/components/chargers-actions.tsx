"use client";

import useLangStore from "@/stores/lang-store";
import { SwitchButton } from "@/components/switch-button";
import t from "@/translations/chargers";
import AddExcelButton from "./add-excel-button";
import AddChargerButton from "./add-charger-button";
import { MobileDropdownMenu } from "./mobile-dropdown";
import oldApi from "@/lib/old-api";

export default function ChargerActions({
  onAddCharger,
  onAddFromExcel,
  onToggleOnlyOnline,
  onlyOnline,
}: any) {
  const { language } = useLangStore();

  return (
    <>
      <div className="max-lg:hidden flex gap-[3rem]">
        <label htmlFor="OnlyOnline" className="dnLabel">
          <SwitchButton
            label={t.onlyAvaliable[language] || "ONLY AVALIABLE CHARGERS"}
            onClick={onToggleOnlyOnline}
          />
        </label>
        <div className="flex gap-3">
          <AddExcelButton onClick={onAddFromExcel} />

          <AddChargerButton onClick={onAddCharger} />
        </div>
      </div>
      <MobileDropdownMenu
        onAddFromExcel={onAddFromExcel}
        onAddCharge={onAddCharger}
        onToggleFilter={onToggleOnlyOnline}
        onlyOnline={onlyOnline}
      />
    </>
  );
}
