import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import SwitcherItem from "@/components/homeaut/switcheritem"
import TempHumItem  from "@/components/homeaut/temphumitem"
import postNewConfig from "@/components/homeaut/api"
import {UnivValue} from "@/components/homeaut/univconfigval"

interface ChickencoopProps {
  devname: string;
  config: Map<string, UnivValue>;
}

function Chickencoop({devname, config} : ChickencoopProps)
{   
    return (
      
      <div>
      <CardHeader>
          <CardTitle>{devname}</CardTitle>
      </CardHeader>    

      <TempHumItem value_name="ht" config={config} ></TempHumItem>
      <SwitcherItem switcher_name="svet" config={config} ></SwitcherItem>
      <SwitcherItem switcher_name="otoplenie" config={config} ></SwitcherItem>

      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={() => { 
                            postNewConfig(devname, config);
                                                                }}>
          Apply
        </Button>
      </CardFooter>
      
      </div>);
}

export default Chickencoop;