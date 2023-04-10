import { AppConfigs, Environments } from './type';

export const defaults: Partial<Record<AppConfigs, any>> = {
  CLIENT_ORIGIN: '*',
  PORT: 4001,
  HASH_SALT_ROUNDS: 10,
  JWT_EXPIRY: 30 * 60, // 30 mins in seconds
  MAX_LOGIN_ATTEMPTS: 3,
  NODE_ENV: Environments.DEVELOPMENT,
};
