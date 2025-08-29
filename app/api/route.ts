import { NextRequest, NextResponse } from 'next/server';
import HomeAutService from '@/services/home.service';

export async function GET() {
    const res = await fetch('http://192.168.1.2:8080/HomeAut/lsdev')
    const data = await res.text()
    const index: number = data.indexOf("\n"); 
    var devicesText  = "";
    if (index != -1)
    {
        const answerResult = data.substring(0, index)
        console.log(`answerResult: ${answerResult}`);
        if (answerResult == "OK")
        {
            devicesText = data.substring(index + 1, data.length)
            console.log(`devicesText: ${devicesText}`);
        }
    }

    return Response.json(devicesText);
}