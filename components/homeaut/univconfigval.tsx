export interface UnivValue {
  values: string[]
  isArray: boolean
}

export interface DeviceConfigUniv {
  dev_name : string
  cnf : Map<string, UnivValue>
}

export interface DeviceConfig {
  name : string
  config : string
}

//export default UnivValue;
