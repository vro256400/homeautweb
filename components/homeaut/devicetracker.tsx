import axios from 'axios'
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DeviceTrackerProps {
  devname: string;
}

function DeviceTracker({devname} : DeviceTrackerProps)
{   
    const [data, setData] = useState("");
    const [fetched, setDataFetched] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('./api2?devname=' + devname); 
            const jsn : string = response.data
            setData(jsn);
            setDataFetched(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }, []);

    if (data.length == 0 && !fetched)
        return (
            <div>
            Loading tracker...
            </div>);
    if (data.length == 0 && fetched)
        return (
            <div>
            </div>);   

    var parsedObject = JSON.parse(data);
    
    const getTimeByNumber = (time_t : number) => {
        const dateObject: Date = new Date(time_t * 1000); 
        return dateObject.toLocaleString();
    };

    const getStatusByNumber = (st : number) => {
        if (st == 2)
            return "untracked";
        if (st == 1)
            return "online";
        return "offline";
    };


    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>time</TableHead>
              <TableHead>status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parsedObject[0].events.map((e : any, rowIndex : any) => (
                <TableRow key={rowIndex}>
                      <TableCell key={"time" + rowIndex}>{getTimeByNumber(e.time)}</TableCell>
                      <TableCell key={"status" + rowIndex}>{getStatusByNumber(e.type)}</TableCell>
                </TableRow>  
            ))}       
          </TableBody>
        </Table>

      </div>);
}

export default DeviceTracker;