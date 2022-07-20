import { Controller, Get, Param } from '@nestjs/common';
import { SkinService } from './skin.service';

@Controller('skin')
export class SkinController {
    constructor(private readonly skinService: SkinService) {}

    @Get()
    findAll(): Promise<ISkinResponse[]>{
      return this.skinService.findAll();
    }

    
    @Get(':id')
    findOne(@Param() id: number): Promise<ISkinResponse>{
      return this.skinService.findOne(id);
    }
    
    @Get('/champ/:champId/:listName')
    findChampSkins(@Param() champId: number, @Param() listName: string): Promise<ISkinResponse[]>{
      return this.skinService.findChampSkins(champId);
    }

    @Get('/all/default/noGender/:listName')
    findAllDefault(@Param() listName: string): Promise<ISkinResponse[]>{
      return this.skinService.findAllDefault(listName)
    }

    @Get('/all/default/female/:listName')
    findAllDefaultFemale(@Param() listName: string): Promise<ISkinResponse[]>{
      return this.skinService.findAllDefaultFemale(listName)
    }

    @Get('/all/default/male/:listName')
    findAllDefaultMale(@Param() listName: string): Promise<ISkinResponse[]>{
      return this.skinService.findAllDefaultMale(listName)
    }

    @Get('/all/male/:listName')
    findAllMale(@Param() listName: string): Promise<ISkinResponse[]>{
      return this.skinService.findAllMale(listName)
    }

    @Get('/all/female/:listName')
    findAllFemale(@Param() listName: string): Promise<ISkinResponse[]>{
      return this.skinService.findAllFemale(listName)
    }
}
