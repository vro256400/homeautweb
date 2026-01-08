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

import { timeToUserView, timeToConfigView } from "@/components/homeaut/univconfig"

export type SwitcherItemCallback = (data: SwitcherItemDTO, switchInndex : number) => void;

interface RangeProps {
  start: string;
  stop : string;
  index : number;
  onChange(start: string, stop : string, index : number): void;
}

function DialogEditRange({start, stop, index, onChange} : RangeProps) {
  const [validdataStart, setValidStart] = React.useState(true)
  const [validdataStop, setValidStop] = React.useState(true)

  const isValidTime = (tim : string) => {
    const digits: string[] = tim.split(":");
    if (digits.length != 2)
      return { valid : false};
    let d1 = parseInt(digits[0], 10);
    if (d1 < 0 || d1 > 23)
      return { valid : false};
    let d2 = parseInt(digits[1], 10);
    if (digits[1].length != 2 || d2 < 0 || d2 > 59)
      return { valid : false};

    return { valid : true, firstNumber: d1, secondNumber : d2};
  }

  /*const handleChangeStart = () => {
    const inputElement = document.getElementById('start_edit_box') as HTMLInputElement;
    let valid = isValidTime(inputElement.value);
    setValidStart(valid.valid); 
  };

  const handleChangeStop = () => {
    const inputElement = document.getElementById('stop_edit_box') as HTMLInputElement;
    let valid = isValidTime(inputElement.value);
    setValidStop(valid.valid); 
  };*/


  const validateAll = () => {
    let inputElement = document.getElementById('start_edit_box') as HTMLInputElement;
    let retStart = isValidTime(inputElement.value);
    setValidStart(retStart.valid); 
    inputElement = document.getElementById('stop_edit_box') as HTMLInputElement;
    let retStop = isValidTime(inputElement.value);
    setValidStop(retStop.valid); 
    if (!retStart.valid || !retStop.valid)
      return;
    
    var start : number = retStart.firstNumber * 60 + retStart.secondNumber;
    var stop : number = retStop.firstNumber * 60 + retStop.secondNumber;
    if (start > stop)
    {
      setValidStart(false); 
      setValidStop(false); 
    }

  }

  const handleOnSaveButton = () => {
    if (!validdataStart || !validdataStop)
      return;
    let inputElement = document.getElementById('start_edit_box') as HTMLInputElement;
    let startv = inputElement.value;
    inputElement = document.getElementById('stop_edit_box') as HTMLInputElement;
    let stopv = inputElement.value;
    onChange(timeToConfigView(startv), timeToConfigView(stopv), index);
  }

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
              <Input id="start_edit_box" name="start" defaultValue={timeToUserView(start)} onChange={validateAll} 
                className={validdataStart ? "" : "border-red-700"}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1" className={validdataStop ? "" : "text-red-700"}>Stop</Label>
              <Input id="stop_edit_box" name="stop" defaultValue={timeToUserView(stop)} onChange={validateAll} 
                className={validdataStop ? "" : "border-red-700"}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={!validdataStart && validdataStop} type="submit" onClick={() => 
                { 
                  handleOnSaveButton();
                }}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
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

import UnivValue from "@/components/homeaut/univconfigval"

interface SwitcherItemProps {
  switcher_name : string;
  config: Map<string, UnivValue>;
  caption : boolean;
}

function SwitcherItem({switcher_name, config, caption}: SwitcherItemProps)
{
    let keyMode = switcher_name + "_mode";
    let keyOn =  switcher_name + "_on";
    let keyStartH = switcher_name + "_startH";
    let keyStartM = switcher_name + "_startM";
    let keyStopH = switcher_name + "_stopH";
    let keyStopM = switcher_name + "_stopM";
    const [valueMode, setMode] = React.useState(config.get(keyMode).values[0])
    const [changeCounter, setChangeCounter] = React.useState(0)
    const handleChange = async (event : any) => {
      setChangeCounter(changeCounter + 1);
    };

    const getStartTime = (index : number) => {
      return config.get(keyStartH)?.values[index] + ":" + config.get(keyStartM)?.values[index];
    };
    
    const getStopTime = (index : number) => {
      return config.get(keyStopH)?.values[index] + ":" + config.get(keyStopM)?.values[index];
    };

    const setStartTime = (index : number, t : string) => {
      const digits : string[] = t.split(':');
      if (digits.length != 2)
        return;
      config.get(keyStartH).values[index] = digits[0].trim();
      config.get(keyStartM).values[index] = digits[1].trim();
    };

    const setStopTime = (index : number, t : string) => {
      const digits : string[] = t.split(':');
      if (digits.length != 2)
        return;
      config.get(keyStopH).values[index] = digits[0].trim();
      config.get(keyStopM).values[index] = digits[1].trim();
    };

    const renderComponent = () =>
    {
      return <div>
          <ComboboxSwitcherMode mode={valueMode} 
            onChange={(m : any) => { 
              config.get(keyMode).values = [m]; setMode(m); 
              }
          }/>
          <div><br/></div>
          {valueMode == "manual" && ( 
            <div className="flex items-center space-x-2">
              <Switch id={switcher_name} 
                  checked={config.get(keyOn).values[0] == "True"} 
                  onCheckedChange={(m : any) => { 
                    config.get(keyOn).values = [m?"True":"False"]; handleChange("onoff"); 
                  }}
              />
              <Label htmlFor="airplane-mode">Manual on</Label>
            </div>
          )}
          {valueMode == "schedule" && ( 
            <div>
              <Button className="w-full" onClick={() => 
                { 
                  config.get(keyStartH).values.push("0");
                  config.get(keyStartM).values.push("0")
                  config.get(keyStopH).values.push("0")
                  config.get(keyStopM).values.push("0")

                  setChangeCounter(changeCounter + 1);
                }}>+</Button>
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
                  {config.get(keyStartH)?.values.map((startH : string, rowIndex : any) => (
                    <TableRow key={rowIndex}>
                      <TableCell key={"begin" + rowIndex}>{timeToUserView(getStartTime(rowIndex))}</TableCell>
                      <TableCell key={"end" + rowIndex}>{timeToUserView(getStopTime(rowIndex))}</TableCell>
                      <TableCell key="del">
              
                        <Button variant="outline" className="w-0" onClick={() => { 
                          setChangeCounter(changeCounter + 1);
                          config.get(keyStartH)?.values.splice(rowIndex, 1);
                          config.get(keyStartM)?.values.splice(rowIndex, 1);
                          config.get(keyStopH)?.values.splice(rowIndex, 1);
                          config.get(keyStopM)?.values.splice(rowIndex, 1);
                          }}>-
                        </Button>
          
                      </TableCell>
                      <TableCell key="edit">              
                        <DialogEditRange start={getStartTime(rowIndex)} 
                          stop={getStopTime(rowIndex)} 
                          index={rowIndex} 
                          onChange={(start: string, stop : string, index : number)=> {
                            setStartTime(index, start);
                            setStopTime(index, stop);
                            //handleChange("range");
                            setChangeCounter(changeCounter + 1);
                          }
                        }></DialogEditRange>
                      </TableCell>
                    </TableRow>  
              
                  ))}
                </TableBody>
              </Table>
              
            </div>
          )}
      </div>;
    }

    return (
      <div id="{changeCounter}">
        {caption ? (<Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>{switcher_name}</CardTitle>
        </CardHeader> 
        <CardContent>
            {renderComponent()} 
        </CardContent>
      </Card>) : 
      (<div>{renderComponent()}</div>)
      }
      
      <br/>
      </div>
    );
}


export default SwitcherItem;
