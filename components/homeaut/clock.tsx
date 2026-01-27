import { UnivValue } from "@/components/homeaut/univconfigval"
//import TempHumItem  from "@/components/homeaut/temphumitem"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ClockProps {
  devname: string;
  config: Map<string, UnivValue>;
}

function Clock({devname, config} : ClockProps)
{   
    let tz = config.get("timezone");
     
    return (<div>
              {config.get("timeH")?.values[0]}:{config.get("timeM")?.values[0]}<br/>
              Timezone: {tz?.values[0]}<br/>
              ntp_domain: {config.get("ntp_domain")?.values[0]}
      </div>)
}

export default Clock;