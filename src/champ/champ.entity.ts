import { Skin } from 'src/skin/skin.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm'; 

@Entity()
export class Champ extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  champId: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @OneToMany(() => Skin, skin => skin.champ)
  skins: Skin[]
}