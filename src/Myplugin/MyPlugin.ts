import { registerPlugin } from "@capacitor/core";

export interface myPluginInterface {
  StartService: () => Promise<{ MyApplication: string }>;
  StopService: () => Promise<{ MyApplication: string }>;
}

const myService = registerPlugin<myPluginInterface>("MyPlugin");

export default myService;
