import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * Generate Filter with Nest CLI
 * 
 * nest g filter common/filters/http-exception
 * 
 * Em NestJS, os "exception filters" são filtros que permitem capturar e lidar com exceções lançadas
 * durante o processamento de uma solicitação HTTP em uma aplicação NestJS. Esses filtros são usados 
 * para interceptar exceções específicas e fornecer uma resposta personalizada ao cliente, em vez de 
 * deixar que a aplicação trave ou retorne uma resposta genérica de erro.
 * 
 */

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const contex = host.switchToHttp();
    const response = contex.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
