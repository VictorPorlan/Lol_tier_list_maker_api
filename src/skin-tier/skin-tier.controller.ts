import { Controller, Get, Param } from '@nestjs/common';
import { SkinTierService } from './skin-tier.service';

@Controller('skin-tier')
export class SkinTierController {
    constructor(private readonly skinTierService: SkinTierService) {}

    @Get("/check/:name")
    findAll(@Param() name: string): Promise<IResponseSkinTier>{
      return this.skinTierService.check(name);
    }

}
