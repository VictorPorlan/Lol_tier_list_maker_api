import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {TypeOrmModule} from '@nestjs/typeorm'
import { DataSource } from "typeorm";
import { ChampModule } from './champ/champ.module';
import { Champ } from "./champ/champ.entity";
import { SkinModule } from './skin/skin.module';
import 'dotenv/config'
import { Skin } from "./skin/skin.entity";
import { ListModule } from './list/list.module';
import { SkinTierModule } from './skin-tier/skin-tier.module';
import { SkinTier } from "./skin-tier/skin-tier.entity";
import { List } from "./list/list.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host:'localhost',
    port:parseInt(process.env.POSTGRES_PORT),
    username:process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database:process.env.POSTGRES_DATABASE,
    entities:[],
    synchronize:false,
    retryDelay:3000,
    retryAttempts:10,
    migrations: ['dist/migrations/*.js']

  }), ChampModule, SkinModule, ListModule, SkinTierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit
{
  constructor(private dataSource: DataSource){}
  async onModuleInit() {
    const result = await this.dataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'migrations'
        );
    `);
    await this.dataSource.dropDatabase()
    await this.dataSource.runMigrations()
    const firstMigrations = result[0]?.exists;
    Logger.log(`Is First Migration? ${firstMigrations ? 'Yes' : 'No'}`, 'migrations');

    if(firstMigrations){
    Logger.log(`Running migrations`, 'migrations');
    await this.dataSource.runMigrations();}

  }
}
