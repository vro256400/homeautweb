"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Switcher from "@/components/homeaut/switcher"
import Chickencoop from "@/components/homeaut/chickencoop"
import TempHum from "@/components/homeaut/temphum"
import Clock from "@/components/homeaut/clock"
import { parseUnivConfig } from "@/components/homeaut/univconfig"
//import postNewConfig from "@/components/homeaut/api"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/*
        
          {parsedObject.map((item : any, devIndex : number) => (
            <div key={item.name}>
              <Card className="w-full max-w-sm">
                {item.type == "pw/chickencoop" && <Chickencoop config={parseUnivConfig(item.config)} devname={item.name}/> }
                {item.type == "pw/switcher" && <Switcher config={parseUnivConfig(item.config)} devname={item.name}/> }
                {item.type == "pw/temphum" &&  <TempHum config={parseUnivConfig(item.config)} devname={item.name}/> }
                {item.type == "pw/clock" && <div>Grid Power ON</div>}
                {item.type == "pw/heatingmanifold" && <div>Теплый пол. Заблокировано.</div>}
              </Card>
              <br/>
            </div>
          ))}
          {!hasClock() && <Card className="w-full max-w-sm">Grid Power OFF</Card>}


*/


function MyClientComponent() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('./api'); 
        const jsn : string = response.data
        setData(jsn);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (data.length == 0)
    return (
        <div>
         Loading...
        </div>);

  var parsedObject = JSON.parse(data);

  let callback = (newConfig: string, devInndex : number) => 
  {
    let oldConfigObj = parsedObject[devInndex];
    parsedObject[devInndex].config = JSON.parse(newConfig);
  }

  let hasClock = () =>
  {
      for(const dev of parsedObject)
          if (dev.type == "pw/clock")
              return true;
      return false;
  }
  
  let objectsChickencoop : any[] = []
  parsedObject.forEach((item : any, devIndex : number) => {
    if (item.type == "pw/chickencoop")
      objectsChickencoop.push(item)
  });

  let objectsSwitcher : any[] = []
  parsedObject.forEach((item : any, devIndex : number) => {
    if (item.type == "pw/switcher")
      objectsSwitcher.push(item)
  });

  let objectsTempHum : any[] = []
  parsedObject.forEach((item : any, devIndex : number) => {
    if (item.type == "pw/temphum")
      objectsTempHum.push(item)
  });

  let objectsClock : any[] = []
  parsedObject.forEach((item : any, devIndex : number) => {
    if (item.type == "pw/clock")
      objectsClock.push(item)
  });

  return (
        <div align="center">
READ ONLY MODE<br/>
Energy Saving Mode - some devices are switched off
          {objectsTempHum.map((item : any, devIndex : number) => (
            <div key={item.name}>
              <Card className="w-full max-w-sm">
                <TempHum config={parseUnivConfig(item.config)} devname={item.name}/>
              </Card>
              <br/>
            </div>
          ))}

          {objectsSwitcher.map((item : any, devIndex : number) => (
            <div key={item.name}>
              <Card className="w-full max-w-sm">
                <Switcher config={parseUnivConfig(item.config)} devname={item.name}/>
              </Card>
              <br/>
            </div>
          ))}

          {hasClock() && <Card className="w-full max-w-sm">Grid Power ON</Card>}
          {!hasClock() && <Card className="w-full max-w-sm">Grid Power OFF</Card>}
           
          <a href="https://map.ukrainealarm.com">Alarms</a>
          <br/>
          <a href="https://www.dtek-krem.com.ua/ua/shutdowns">Grid Power Accidents</a>
          <br/>
          
          {objectsClock.map((item : any, devIndex : number) => (
            <div key={item.name}>
              <Card className="w-full max-w-sm">
                <Clock config={parseUnivConfig(item.config)} devname={item.name}/>
              </Card>
              <br/>
            </div>
          ))}

          
        </div>);
}

export default function Home() {
  return (
    <div>
    <MyClientComponent />
    </div>
  );
}
