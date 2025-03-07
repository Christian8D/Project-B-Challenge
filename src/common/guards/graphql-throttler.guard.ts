
//TODO: Enable this file to use throttler guard in graphql DEBUGGING

// import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
// import { ThrottlerGuard } from '@nestjs/throttler';
// import { GqlExecutionContext } from '@nestjs/graphql';

// @Injectable()
// export class GqlThrottlerGuard extends ThrottlerGuard {
//   private readonly logger = new Logger(GqlThrottlerGuard.name);

//   getRequest(context: ExecutionContext) {
//     const gqlContext = GqlExecutionContext.create(context);
//     const req = gqlContext.getContext().req;

//     if (!req) {
//       this.logger.error('Request object is not available in GraphQL context');
//       throw new Error('Request object not found in GraphQL context');
//     }

//     // Fallback for IP extraction
//     req.ip =
//       req.ip || // Use existing `req.ip` if available
//       req.headers['x-forwarded-for']?.split(',')[0] || // Get IP from proxy headers
//       req.connection?.remoteAddress || // Fallback to connection info
//       'unknown';

//     this.logger.debug(`GraphQL Request IP: ${req.ip}`);
//     return req; // Return the full request object
//   }
// }
