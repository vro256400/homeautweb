import { NextRequest, NextResponse } from 'next/server';
import HomeAutService from '@/services/home.service';

export async function GET() {
    const res = await fetch(process.env.NEXT_PUBLIC_HA_API_SERVER + 'HomeAut/lsdev')
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

export async function POST(request: Request) 
{
    const textBody = await request.text();

    var url = process.env.NEXT_PUBLIC_HA_API_SERVER + "HomeAut/scfgdevs"
    const options: RequestInit = {
        method: 'POST',
        headers: {
        'Content-Type': 'text/plain',
        },
        body: textBody
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // Handle HTTP errors (e.g., 404, 500)
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
        }
        const result = await response.text();
        return Response.json({res:"Ok"})
    } catch (error) {
        console.error('Error creating post:', error);
        throw error; // Re-throw to allow further handling
    }
}