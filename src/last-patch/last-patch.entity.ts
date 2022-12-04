import { Champ } from 'src/champ/champ.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm'; 

@Entity()
export class LastPatch extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastPatch: string;
}