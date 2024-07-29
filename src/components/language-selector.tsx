"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CircleFlag } from "react-circle-flags";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import useLangStore from "@/stores/lang-store";

import { cn } from "@/lib/utils";
import { LanguageType, LanguageOption } from "@/lib/types";
import { LANGUAGES } from "@/lib/constants";

const LanguageSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLangStore();

  const selectedLanguage =
    LANGUAGES.find((lang) => lang.value === language) || LANGUAGES[0];

  const handleLanguageSelect = (currentValue: LanguageType) => {
    setLanguage(currentValue);
    setOpen(false);
  };

  const renderLanguageOption = (lang: LanguageOption) => (
    <div className="flex gap-2 items-center relative h-6">
      <CircleFlag
        countryCode={lang.value}
        className="object-cover h-4 opacity-85"
      />
      {lang.label}
    </div>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[9rem] justify-between absolute top-0 right-0 mr-3 mt-3 shadow-none text-slate-800"
        >
          {renderLanguageOption(selectedLanguage)}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[9rem] p-0 text-slate-800">
        <Command>
          <CommandList>
            <CommandGroup>
              {LANGUAGES.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  onSelect={(value) =>
                    handleLanguageSelect(value as LanguageType)
                  }
                >
                  {renderLanguageOption(lang)}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      language === lang.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
