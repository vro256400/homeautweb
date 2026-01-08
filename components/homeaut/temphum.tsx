import { UnivValue } from "@/components/homeaut/univconfigval"
import TempHumItem  from "@/components/homeaut/temphumitem"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TempHumProps {
  devname: string;
  config: Map<string, UnivValue>;
}

function TempHum({devname, config} : TempHumProps)
{   
    return (<div>
      <CardHeader>
            <CardTitle>{devname}</CardTitle>
      </CardHeader> 
      <TempHumItem value_name="ht" config={config} caption={false}></TempHumItem>
      </div>)
}

export default TempHum;