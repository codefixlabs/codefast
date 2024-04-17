"use client";

import { Popover, PopoverContent, type PopoverProps, PopoverTrigger } from "@codefast/ui/popover";
import { useRouter } from "next/navigation";
import { Button } from "@codefast/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@codefast/ui/command";
import { cn } from "@codefast/ui/utils";
import { type JSX, useState } from "react";
import { type Preset } from "@/app/examples/playground/data/presets";

interface PresetSelectorProps extends PopoverProps {
  presets: Preset[];
}

export function PresetSelector({ presets, ...props }: PresetSelectorProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>();
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {selectedPreset ? selectedPreset.name : "Load a preset..."}
          <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search presets..." />
          <CommandList>
            <CommandEmpty>No presets found.</CommandEmpty>
            <CommandGroup heading="Examples">
              {presets.map((preset) => (
                <CommandItem
                  key={preset.id}
                  onSelect={() => {
                    setSelectedPreset(preset);
                    setOpen(false);
                  }}
                >
                  {preset.name}
                  <CheckIcon
                    className={cn("ml-auto size-4", selectedPreset?.id === preset.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup className="pt-0">
              <CommandItem
                onSelect={() => {
                  router.push("/examples");
                }}
              >
                More examples
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}