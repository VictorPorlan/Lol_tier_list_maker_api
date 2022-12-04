import { Module } from '@nestjs/common';
import { LastPatchController } from './last-patch.controller';
import { LastPatchService } from './last-patch.service';

@Module({
  controllers: [LastPatchController],
  providers: [LastPatchService]
})
export class LastPatchModule {}
