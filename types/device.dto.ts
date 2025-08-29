
export interface DeviceSwitcherDTO {
  switchers: SwitcherItemDTO[]
  tz_hours: number
}

export interface SwitcherItemDTO {
  mode: string
  on: boolean
  ranges: string[][]
  switchname: string
}
