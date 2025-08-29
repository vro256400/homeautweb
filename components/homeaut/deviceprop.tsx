export type DeviceItemCallback = (newConfig: string, devInndex : number) => void;

export interface DeviceProps {
    devname : string;
    config: string;
    devindex : number;
    callback_data : DeviceItemCallback;  
}