import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.muskan.familyplanner",
  appName: "Family Wedding Planner",

  server: {
    url: "https://family-wedding-planner.vercel.app",
    cleartext: false,
  },
};

export default config;