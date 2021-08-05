import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketService {
  getHello(): string {
    return 'Hello World!';
  }
}
