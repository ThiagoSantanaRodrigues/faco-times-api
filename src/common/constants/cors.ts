import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const cors: CorsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};
