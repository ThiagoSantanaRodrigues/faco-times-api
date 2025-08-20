import { IsEnum, IsNumber, IsString } from 'class-validator';
import { EnumEnvironment } from '../contracts/environment.enum';

export class Variables {
  @IsEnum(EnumEnvironment)
  FACO_TIMES_ENV: EnumEnvironment;

  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsNumber()
  DATABASE_CONNECTION_TIMEOUT: number;

  @IsString()
  POSTGRESQL_USER: string;

  @IsString()
  POSTGRESQL_PASSWORD: string;

  @IsString()
  POSTGRESQL_DB: string;
}
