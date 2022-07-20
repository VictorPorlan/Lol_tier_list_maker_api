import { SkinTier } from 'src/skin-tier/skin-tier.entity';
import { Skin } from 'src/skin/skin.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from 'typeorm'; 

@Entity()
export class List extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SkinTier, skinTier => skinTier.list)
  tiers: SkinTier[]

}