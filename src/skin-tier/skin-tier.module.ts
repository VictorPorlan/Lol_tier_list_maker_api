import { Module } from '@nestjs/common';
import { SkinTierService } from './skin-tier.service';
import { SkinTierController } from './skin-tier.controller';

@Module({
  providers: [SkinTierService],
  controllers: [SkinTierController]
})
export class SkinTierModule {}
