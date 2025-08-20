import {
  INestApplication,
  Logger,
  ValidationPipeOptions
} from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Config class for start the application.
 * Extracts the overwhelming configuration from  `bootstrap` function.
 */
export class Kernel {
  constructor(private readonly app: INestApplication) {}

  static validationPipeConfig: ValidationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: true,
    transform: true
  };

  async boot() {
    const port = process.env.PORT ?? 3000;
    const context = Kernel.name;

    const userAccessToken: SecuritySchemeObject = {
      description: `Por favor insira o ACCESS_TOKEN fornecido no login.<br>
      Esse token tem o seguinte formato: Bearer JWT`,
      name: 'Authorization',
      type: 'http'
    };

    const config = new DocumentBuilder()
      .setTitle('API faco times')
      .setDescription('Api para controle de dados do faco times')
      .setVersion('1.0')
      .addBearerAuth(userAccessToken, 'USER_ACCESS_TOKEN')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document);
   
    const callback = () =>
      Logger.log(`Faco times is running on port ${port}`, context);

    await this.app.startAllMicroservices();
    return this.app.listen(port, callback);
  }
}
