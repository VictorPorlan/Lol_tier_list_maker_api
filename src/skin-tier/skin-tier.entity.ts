import { List } from 'src/list/list.entity';
import { Skin } from 'src/skin/skin.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm'; 

@Entity()
export class SkinTier extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tier: string;

  @ManyToOne(() => List, list => list.tiers)
  list: List;

  @OneToOne(() => Skin)
  @JoinColumn()
  skinId: Skin
}