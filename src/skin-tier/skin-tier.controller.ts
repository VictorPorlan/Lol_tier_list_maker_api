import { Controller, Get, Param } from '@nestjs/common';
import { SkinTierService } from './skin-tier.service';

@Controller('skin-tier')
export class SkinTierController {
    constructor(private readonly skinTierService: SkinTierService) {}

    @Get("/check/:listName")
    findAll(@Param('listName') listName: string): Promise<IResponseSkinTier>{
      return this.skinTierService.check(listName);
    }

    @Get("/setTier/:listName/:skinId/:tier")
    setTier(
      @Param('listName') listName: string,
      @Param('tier') tier: string, 
      @Param('skinId') skinId: number): Promise<IResponseSkinTier>{
      return this.skinTierService.setTier(listName, tier, skinId);
    }

}
