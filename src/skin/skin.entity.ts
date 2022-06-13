import { Champ } from 'src/champ/champ.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm'; 

@Entity()
export class Skin extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Champ, champ => champ.skins)
  champ: Champ;

  @Column()
  name: string;

  @Column()
  splashartUrl: string;

  @Column()
  skinNumber: number;

  @Column({ type: 'bytea', nullable: false })
  splashart: Buffer
}