import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  statusServer(): any {
    return {server: 'on'};
  }
}
