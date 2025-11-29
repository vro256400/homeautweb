"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import DeviceSwitcher from "@/components/homeaut/switcher"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

async function postNewConfig(config: string): Promise<any> {
  var url = process.env.NEXT_PUBLIC_HA_API_SERVER + "HomeAut/scfgdevs"
  
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: "cfg=" + config
  };

  try {
    const response = await fetch('./api', options);
    if (!response.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error; // Re-throw to allow further handling
  }
}

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
        <div>
          {parsedObject.map((item : any, devIndex : number) => (
            <li key={item.name}>
              <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                </CardHeader>      
                {item.type == "switcher" && <DeviceSwitcher config={JSON.stringify(item.config)} devname={item.name} devindex={devIndex} callback_data={callback}/> }
                <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full" onClick={() => { 
                                      postNewConfig(JSON.stringify(parsedObject));
                                                                          }}>
                    Apply
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}

        <br/><br/><br/><br/>
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