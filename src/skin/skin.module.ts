import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkinController } from './skin.controller';
import { Skin } from './skin.entity';
import { SkinService } from './skin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skin]),
    forwardRef(() => Skin),
  ],
  controllers: [SkinController],
  providers: [SkinService, Repository<Skin>]
})
export class SkinModule {}
