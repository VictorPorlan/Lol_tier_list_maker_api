import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SkinTierService } from './skin-tier.service';

@Controller('skin-tier')
export class SkinTierController {
    constructor(private readonly skinTierService: SkinTierService) {}

    @Get("/check/:listName")
    findAll(@Param('listName') listName: string): Promise<IResponseSkinTier>{
      return this.skinTierService.check(listName);
    }

    @Post("/setTier")
    setTier(
      @Body() dto: IBodySetTier): Promise<IResponseSkinTier>{
      return this.skinTierService.setTier(dto);
    }

}
