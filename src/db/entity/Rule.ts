import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { Cases, DataTypes } from "../../types";

@Entity()
export class Rule extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	ruleProject: string;

	@Column()
	ruleObject: string;

	@Column()
	ruleField: string;

	@Column()
	ruleFieldOccurance: number;

	@Column()
	ruleDataType: DataTypes;

	@Column()
	ruleRequired: boolean;

	@Column()
	ruleCase: Cases;

	@Column()
	ruleDependency: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
