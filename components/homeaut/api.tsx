import { createUnivConfig } from "@/components/homeaut/univconfig"
import {UnivValue, DeviceConfigUniv} from "@/components/homeaut/univconfigval"

async function postNewConfig(dev_name : string, cnf: Map<string, UnivValue>): Promise<any> {
  let configUniv : DeviceConfigUniv;
  configUniv = {
      dev_name : dev_name,
      cnf : cnf
  };
  let devices_config : DeviceConfigUniv[];
  devices_config = [configUniv];
  let config = createUnivConfig(devices_config);

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: "cfg=" + config
  };

  try {
    const response = await fetch('./api', options);
    if (!response.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error; // Re-throw to allow further handling
  }
}

export default postNewConfig;