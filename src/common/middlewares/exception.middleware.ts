import { generateErrorResponse } from '@common/utils/generate-error-response';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    Logger.error(exception, HttpExceptionFilter.name);

    const isKnowException = exception instanceof HttpException;

    const statusCode = isKnowException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = isKnowException
      ? exception.getResponse()
      : generateErrorResponse();


    return response.status(statusCode).json(error);
  }
}
