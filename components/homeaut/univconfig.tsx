import {UnivValue, DeviceConfigUniv, DeviceConfig} from "@/components/homeaut/univconfigval"


export function parseUnivConfig(textCnf : string)
{
    const lines: string[] = textCnf.split(/\r?\n|\r|\n/g);
    const ret = new Map<string, UnivValue>();
    lines.forEach((line, index) => {
        let kv: string[] = line.split(':');
        if (kv.length != 2)
            return;
        let key : string = kv[0].trim();
        let value : string = kv[1].trim();
        if (value.length == 0 || value[0] != '[')
        {
            let uv : UnivValue = {values : [value], isArray : false};
            ret.set(key, uv);
            return;
        }
        if (value[value.length - 1] != ']')
            return;
        value = value.substring(1, value.length - 1);
        kv = value.split(',');
        for (let i = 0; i < kv.length; i++) 
            kv[i] = kv[i].trim();
        let uv : UnivValue = {values : kv, isArray : true};
        ret.set(key, uv);
    });
    
    return ret;
}



export function createUnivConfig(devices_config : DeviceConfigUniv[]) : string
{
    var pw_config : DeviceConfig[];
    pw_config = [];

    for(const dev_config of devices_config)
    {
        let config : DeviceConfig;
        config = {
            name : dev_config.dev_name,
            config : ""
        };
        config.config = "";
        for (const [key, value] of dev_config.cnf) 
        {
            config.config += key + " : ";
            if (value.isArray)
                config.config += "[";

            let firstValue = true;
            for (const v of value.values) {
                if (!firstValue)
                    config.config += ",";
                firstValue = false;
                config.config += v; 
            }

            if (value.isArray)
                config.config += "]";
            config.config += "\n";
        }

        pw_config.push(config);
    }
    return JSON.stringify(pw_config);
}

export function timeToUserView(val : string) {
    let kv: string[] = val.split(':');
    if (kv.length != 2)
      return val;
    let h : string = kv[0].trim();
    let m : string = kv[1].trim();
    while(m.length < 2)
      m = '0' + m;

    return h + ":" + m;  
};

export function timeToConfigView(val : string) {
    let kv: string[] = val.split(':');
    if (kv.length != 2)
      return val;
    let h : string = kv[0].trim();
    let m : string = kv[1].trim();
    while(m.length > 1 && m[0] == '0')
      m = m.substring(1, m.length);

    while(h.length > 1 && h[0] == '0')
      h = h.substring(1, h.length);

    let res = h + ":" + m;

    return res;  
  };
