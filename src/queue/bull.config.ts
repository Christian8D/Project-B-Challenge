import { BullModuleOptions } from '@nestjs/bull';

export const bullConfig: BullModuleOptions = {
  // Connection details to Redis
  redis: {
    host: 'localhost',
    port: 6379,
  },
};
