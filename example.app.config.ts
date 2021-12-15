import { ExpoConfig, ConfigContext } from '@expo/config';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

export default (ctx: ConfigContext): ExpoConfig => ({
  ...ctx.config,
  name: 'My Doctor',
  slug: 'my-doctor',
  extra: {
    ...firebaseConfig,
    // Other environment variables...
  },
});
