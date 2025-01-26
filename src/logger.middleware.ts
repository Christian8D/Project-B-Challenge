// logger debugger

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {

    //TODO: Log request details debugger
    // this.logger.log(

    //   `${req.method} ${req.originalUrl} - Headers: ${JSON.stringify(req.headers)} ${JSON.stringify(req.body)}`,
    //   `${JSON.stringify(req.body)}`,
    // );
    next();
  }
}
