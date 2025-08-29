import * as React from "react"
import { DeviceSwitcherDTO, SwitcherItemDTO } from '@/types/device.dto';
import SwitcherItem, { SwitcherItemCallback } from "@/components/homeaut/switcheritem"
import { DeviceProps } from "@/components/homeaut/deviceprop"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


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