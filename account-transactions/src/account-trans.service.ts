import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountTransService {
  getHello(): string {
    return 'Hello World!';
  }
}
