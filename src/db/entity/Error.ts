import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Error extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ select: false })
	errorRun: number;

	@Column({ select: false })
	errorProject: string;

	@Column()
	errorObject: string;

	@Column()
	errorCount: number;

	@Column()
	errorFree: number;

	@Column()
	errorDependency: number;

	@Column()
	errorDataType: number;

	@Column()
	errorExistence: number;

	@CreateDateColumn({ select: false })
	createdAt: Date;

	@UpdateDateColumn({ select: false })
	updatedAt: Date;
}
