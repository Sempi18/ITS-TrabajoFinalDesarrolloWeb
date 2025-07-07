import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

interface EnvVars {
  PORT: number;
  USER_CLIENT_HOST: string;
  USER_CLIENT_PORT: number;
  FACTURA_SERVICE_HOST: string;
  FACTURA_SERVICE_PORT: number;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    USER_CLIENT_HOST: joi.string().required(),
    USER_CLIENT_PORT: joi.number().required(),
    FACTURA_SERVICE_HOST: joi.string().required(),
    FACTURA_SERVICE_PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  USER_CLIENT_HOST: envVars.USER_CLIENT_HOST,
  USER_CLIENT_PORT: envVars.USER_CLIENT_PORT,
  FACTURA_SERVICE_HOST: envVars.FACTURA_SERVICE_HOST,
  FACTURA_SERVICE_PORT: envVars.FACTURA_SERVICE_PORT,
  JWT_SECRET: envVars.JWT_SECRET,
};
