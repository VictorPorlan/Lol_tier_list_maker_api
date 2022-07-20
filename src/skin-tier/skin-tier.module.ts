import { forwardRef, Module } from '@nestjs/common';
import { SkinTierService } from './skin-tier.service';
import { SkinTierController } from './skin-tier.controller';
import { Repository } from 'typeorm';
import { SkinTier } from './skin-tier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkinTier]),
    forwardRef(() => SkinTier),
  ],
  providers: [SkinTierService, Repository<SkinTier>],
  controllers: [SkinTierController]
})
export class SkinTierModule {}
