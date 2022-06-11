import { Champ } from 'src/champ/champ.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'; 

@Entity()
export class Skin {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Champ, champ => champ.id)
  champ: Champ;

  @Column()
  name: string;

  @Column()
  skinNumber: number;

}