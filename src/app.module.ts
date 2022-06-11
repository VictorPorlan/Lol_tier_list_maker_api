import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {TypeOrmModule} from '@nestjs/typeorm'
import { DataSource } from "typeorm";
import { ChampModule } from './champ/champ.module';
import { Champ } from "./champ/champ.entity";
import { SkinModule } from './skin/skin.module';
import 'dotenv/config'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password: 'root',
    database:'my_db',
    entities:[Champ],
    synchronize:false,
    retryDelay:3000,
    retryAttempts:10,
    migrations: ['dist/migrations/*.js']
  }), ChampModule, SkinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit
{
  constructor(private dataSource: DataSource){}
  async onModuleInit() {
    console.log(process)
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
