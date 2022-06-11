import { Skin } from 'src/skin/skin.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'; 

@Entity()
export class Champ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  champId: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @ManyToOne(() => Skin, skin => skin.champ)
  skins: Skin[]
}