"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Switcher from "@/components/homeaut/switcher"
import Chickencoop from "@/components/homeaut/chickencoop"
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

  return (
        <div align="center">
          {parsedObject.map((item : any, devIndex : number) => (
            <div key={item.name}>
              <Card className="w-full max-w-sm">

                {item.type == "pw/chickencoop" && <Chickencoop config={parseUnivConfig(item.config)} devname={item.name}/> }
                {item.type == "pw/switcher" && <Switcher config={parseUnivConfig(item.config)} devname={item.name}/> }

              </Card>
              <br/>
            </div>
          ))}

          <br/><br/><br/>Debug data from the server<br/>
          {data}
        </div>);
}

export default function Home() {
  return (
    <div>
    <MyClientComponent />
    </div>
  );
}