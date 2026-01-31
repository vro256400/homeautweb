// http://192.168.1.2:8080/HomeAut_HAModuleDeviceTracking/status/clock
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    console.log("tracking url");

    const searchParams = request.nextUrl.searchParams; 
    const devName = searchParams.get('devname');
    var url = "HomeAut_HAModuleDeviceTracking/status";
    if (devName != null)
        url += "/" + devName;

    const res = await fetch(process.env.NEXT_PUBLIC_HA_API_SERVER + url)
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
            console.error('received from PW:', devicesText);
            if (devicesText == "[]")
                devicesText = "";
//            console.log(`devicesText: ${devicesText}`);
        }
    }

    return Response.json(devicesText);
}