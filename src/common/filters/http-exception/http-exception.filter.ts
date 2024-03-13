import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express'

//aqui quando pegamos o HttpExcetion vamos adi
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const contex = host.switchToHttp();
    const response = contex.getResponse<Response>()

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse()
    const error = 
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object)

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    })
  }
}
