
import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../contracts/error-response.contract';

export const generateErrorResponse = (
  error?: AxiosError,
  defaultMessage?: string
): ErrorResponse => {
  if (!error && !defaultMessage) {
    return {
      message: 'Erro interno no servidor',
      error: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    };
  }

  return {
    message: error?.response?.data ? error.response.data : defaultMessage,
    error: error?.response?.statusText ? error.response.statusText : '',
    statusCode: error?.response?.status ? error.response.status : 500
  };
};
