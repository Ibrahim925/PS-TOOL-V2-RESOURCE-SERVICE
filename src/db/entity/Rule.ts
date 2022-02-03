import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

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
	ruleDataType: "STRING" | "INTEGER" | "BOOLEAN" | "CHAR" | "DATETIME" | "TEXT";

	@Column()
	ruleRequired: boolean;

	@Column()
	ruleCase: "UPPER" | "LOWER" | "CAMEL" | "SNAKE" | "ANY";

	@Column()
	ruleDependency: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
