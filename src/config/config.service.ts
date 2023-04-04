import { User } from '@app/user/user.entity';
import { DataSourceOptions } from 'typeorm';
import { defaults } from './defaults';
import { AppConfigs } from './type/app-config.enum';
import { Environments } from './type/environments.enum';

export class ConfigService {
  static getValue(key: AppConfigs) {
    return process.env[key] || defaults[key];
  }

  static getIntValue(key: AppConfigs): number {
    return parseInt(this.getValue(key));
  }

  static getBooleanValue(key: AppConfigs): boolean {
    const value = this.getValue(key);
    if (value === 'false') return false;
    return !!value;
  }

  static ensureRequired() {
    for (const config of Object.keys(AppConfigs)) {
      if (this.getValue(AppConfigs[config]) === undefined)
        throw new Error(`Config error - missing env.${config}`);
    }
  }

  static isProduction() {
    return this.getValue(AppConfigs.NODE_ENV) === Environments.PRODUCTION;
  }

  static getOrmConfig(connectionName = 'default'): DataSourceOptions {
    return {
      name: connectionName,
      type: 'postgres',
      host: this.getValue(AppConfigs.DATABASE_HOST),
      port: this.getIntValue(AppConfigs.DATABASE_PORT),
      username: this.getValue(AppConfigs.DATABASE_USERNAME),
      password: this.getValue(AppConfigs.DATABASE_PASSWORD),
      database: this.getValue(AppConfigs.DATABASE_NAME),
      ssl: this.isProduction(),
      logging: true,
      //   logger: new OrmCustomLogger(true),
      migrationsRun: true,
      entities: [User],
      migrations: [],
      synchronize: true,
    };
  }
}
