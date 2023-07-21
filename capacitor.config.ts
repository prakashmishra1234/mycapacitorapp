import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.mycapacitorapp",
  appName: "mycapacitorapp",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
};

export default config;
