import * as React from "react"
import { DeviceSwitcherDTO, SwitcherItemDTO } from '@/types/device.dto';
import SwitcherItem, { SwitcherItemCallback } from "@/components/homeaut/switcheritem"
import { DeviceProps } from "@/components/homeaut/deviceprop"
import { Button } from "@/components/ui/button";
import postNewConfig from "@/components/homeaut/api"

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
interface DeviceSwitcherState {
  count: number;
}

class DeviceSwitcher extends React.Component<DeviceProps, DeviceSwitcherState> {
  state: DeviceSwitcherState = {
    count: 0,
  };

  config : DeviceSwitcherDTO = {switchers: [], tz_hours: 3};
  constructor(props: DeviceProps) {
    super(props); 
    const dd = JSON.parse(this.props.config)
    this.config = dd as DeviceSwitcherDTO;
  }

  callback = (data: SwitcherItemDTO, switchInndex : number) => 
  {
    this.config.switchers[switchInndex] = data;
    this.props.callback_data(JSON.stringify(this.config.switchers), this.props.devindex);
  }
 
  render() {
    return (
        <CardContent>
            {this.config.switchers.map((item : any, switchInndex : number) => (
                <div key={item.switchname}>
                    <SwitcherItem config={item} callback_data={this.callback} switch_inndex={switchInndex}/>
                </div>
                
            ))}
        </CardContent>
    );
  }
}

export default DeviceSwitcher;
*/

interface SwitcherProps {
  devname: string;
  config: Map<string, UnivValue>;
}

function Switcher({devname, config} : SwitcherProps)
{   
    // detect list of switchers pins
    let switchers_names = new Set<string>();
    for (const [key, value] of config) 
    {
      let index : number = key.indexOf("_startH");
      if (index == -1)
        continue;
      let name : string = key.substring(0, index);
      switchers_names.add(name);
    }
    const switchers_names_array = Array.from(switchers_names);
    let enableCaption : boolean = switchers_names_array.length != 1;
    return (
      
      <div>
        <CardHeader>
            <CardTitle>{devname}</CardTitle>
        </CardHeader>    
        
        {switchers_names_array.map((pin_name) => (
          <SwitcherItem switcher_name={pin_name} config={config} caption={enableCaption}></SwitcherItem>
        ))}

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={() => { 
                              postNewConfig(devname, config);
                                                                  }}>
            Apply
          </Button>
        </CardFooter>

      </div>);
}

export default Switcher;