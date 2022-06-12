import { Controller, Get, Param } from '@nestjs/common';
import { SkinService } from './skin.service';

@Controller('skin')
export class SkinController {
    constructor(private readonly skinService: SkinService) {}

    @Get(':id')
    findOne(@Param() id: number): any {
      return this.skinService.findOne(id);
    }
}
