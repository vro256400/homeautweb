import * as React from "react"
import { DeviceSwitcherDTO, SwitcherItemDTO } from '@/types/device.dto';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

export type SwitcherItemCallback = (data: SwitcherItemDTO, switchInndex : number) => void;

interface SwitcherItemProps {
  config: SwitcherItemDTO;
  callback_data : SwitcherItemCallback;  
  switch_inndex : number;
}

interface SwitcherItemState {
  count: number;
}

interface ModeProps {
  mode: string;
  onChange(value: string): void;
}

const modes = [
  {
    value: "manual",
    label: "manual",
  },
  {
    value: "schedule",
    label: "schedule",
  }
];

interface RangeProps {
  start: string;
  stop : string;
  index : number;
  onChange(start: string, stop : string, index : number): void;
}

function DialogEditRange({start, stop, index, onChange} : RangeProps) {
  const [startv, setStart] = React.useState(start)
  const [stopv, setStop] = React.useState(stop)
  const [validdataStart, setValidStart] = React.useState(true)
  const [validdataStop, setValidStop] = React.useState(true)

  const isValidTime = (tim : string) => {
    const digits: string[] = tim.split(":");
    if (digits.length != 2)
      return false;
    let d = parseInt(digits[0], 10);
    if (digits[0].length != 2 || d < 0 || d > 23)
      return false;
    d = parseInt(digits[1], 10);
    if (digits[1].length != 2 || d < 0 || d > 59)
      return false;

    return true;
  }

  const handleChangeStart = () => {
    const inputElement = document.getElementById('start_edit_box') as HTMLInputElement;
    let valid = isValidTime(inputElement.value);
    setValidStart(valid); 
    if ((startv != inputElement.value) && valid)
    {
      setStart(inputElement.value);
    }
  };

  const handleChangeStop = () => {
    const inputElement = document.getElementById('stop_edit_box') as HTMLInputElement;
    let valid = isValidTime(inputElement.value);
    setValidStop(valid); 
    if ((stopv != inputElement.value) && valid)
    {
      setStop(inputElement.value);
    }
  };

  useEffect(() => {
    if ((startv != start) || (stopv != stop))
    {
      onChange(startv, stopv, index);
    }
  });

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">...</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit range</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1"  className={validdataStart ? "" : "text-red-700"}>Start</Label>
              <Input id="start_edit_box" name="start" defaultValue={startv} onChange={handleChangeStart} 
                className={validdataStart ? "" : "border-red-700"}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1" className={validdataStop ? "" : "text-red-700"}>Stop</Label>
              <Input id="stop_edit_box" name="stop" defaultValue={stopv} onChange={handleChangeStop} 
                className={validdataStop ? "" : "border-red-700"}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={!validdataStart && validdataStop} type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

function ComboboxSwitcherMode({ mode, onChange }: ModeProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(mode)

  const handleChange = (m : any) => {
    onChange(m);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? modes.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {modes.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    handleChange(currentValue)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    
  )
}

function SwitcherItem({ config, callback_data, switch_inndex }: SwitcherItemProps)
{
    const [valueMode, setMode] = React.useState(config.mode)
    const [changeCounter, setChangeCounter] = React.useState(0)
    const handleChange = async (event : any) => {
      setChangeCounter(changeCounter + 1);
    };

    callback_data(config, switch_inndex);

    return (
      <div id="{changeCounter}">
      <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>{config.switchname}</CardTitle>
        </CardHeader> 
        <CardContent>
            <ComboboxSwitcherMode mode={valueMode} onChange={(m : any) => { config.mode = m; setMode(m); }}/>
          
            {valueMode == "manual" && ( 
              <div className="flex items-center space-x-2">
                <Switch id={config.switchname} data-state={config.on ? "checked" : "unchecked"} onCheckedChange={(m : any) => { config.on=m;  callback_data(config, switch_inndex); }}/>
                <Label htmlFor="airplane-mode">Manual on</Label>
              </div>
            )}

            {valueMode == "schedule" && ( 
              <div>
                <Button className="w-full" onClick={() => { alert("alert test"); }}>+</Button>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>start</TableHead>
                      <TableHead>stop</TableHead>
                      <TableHead></TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {config.ranges.map((range : string[], rowIndex : any) => (
                      <TableRow key={rowIndex} >
                        { range.map((cell : any) => (
                              <TableCell key={cell}>{cell}</TableCell>
                        ))}
                        <TableCell key="del">
                
                          <Button variant="outline" className="w-0" onClick={() => { 
                            setChangeCounter(changeCounter + 1);
                            config.ranges.splice(rowIndex, 1);
                            }}>-
                          </Button>
            
                                
                          
                        </TableCell>
                        <TableCell key="edit">
                         
                          <DialogEditRange start={range[0]} stop={range[1]} index={rowIndex} onChange={(start: string, stop : string, index : number)=>
                            {
                              config.ranges[index][0] = start;
                              config.ranges[index][1] = stop;
                              handleChange("range");
                            }
                          }></DialogEditRange>
                        </TableCell>
                      </TableRow>  
                
                    ))}
                  </TableBody>
                </Table>
                
                
                
              </div>
            )}
            
        </CardContent>
      </Card>
      <br/>
      </div>
    );
}

export default SwitcherItem;