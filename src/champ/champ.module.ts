import { Module } from '@nestjs/common';
import { ChampService } from './champ.service';
import { ChampController } from './champ.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Champ } from './champ.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Champ])],
  providers: [ChampService],
  controllers: [ChampController]
})
export class ChampModule {}
