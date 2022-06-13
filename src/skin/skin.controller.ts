import { Controller, Get, Param } from '@nestjs/common';
import { SkinService } from './skin.service';

@Controller('skin')
export class SkinController {
    constructor(private readonly skinService: SkinService) {}

    @Get()
    findAll(): Promise<ISkinResponse[]>{
      return this.skinService.findAll();
    }

    @Get('/champ/:champId')
    findChampSkins(@Param() champId: number): Promise<ISkinResponse[]>{
      return this.skinService.findChampSkins(champId);
    }

    @Get(':id')
    findOne(@Param() id: number): Promise<ISkinResponse>{
      return this.skinService.findOne(id);
    }
    
    @Get('/all/default')
    findAllDefault(): Promise<ISkinResponse[]>{
      return this.skinService.findAllDefault()
    }

    @Get('/all/default/female')
    findAllDefaultFemale(): Promise<ISkinResponse[]>{
      return this.skinService.findAllDefaultFemale()
    }

    @Get('/all/default/male')
    findAllDefaultMale(): Promise<ISkinResponse[]>{
      return this.skinService.findAllDefaultMale()
    }

    @Get('/all/male')
    findAllMale(): Promise<ISkinResponse[]>{
      return this.skinService.findAllMale()
    }

    @Get('/all/female')
    findAllFemale(): Promise<ISkinResponse[]>{
      return this.skinService.findAllFemale()
    }
}
