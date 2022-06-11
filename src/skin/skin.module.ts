import { Module } from '@nestjs/common';
import { SkinController } from './skin.controller';
import { SkinService } from './skin.service';

@Module({
  controllers: [SkinController],
  providers: [SkinService]
})
export class SkinModule {}
