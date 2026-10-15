import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.noyela.app',
  appName: 'Noyela',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: "native",
      resizeOnFullScreen: true,
    },
    SocialLogin: {
      providers: {
        google: true,
        apple: true,
        facebook: false,
        twitter: false,
      },
      logLevel: 1,
    },
  },
};

export default config;
