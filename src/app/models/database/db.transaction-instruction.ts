import {Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt} from "sequelize-typescript";
import {TransactionInstructionItemModel} from "./db.transaction-instruction-item";

@Table({tableName: "TRANSACTION_INSTRUCTION"})
export class TransactionInstructionModel extends Model<TransactionInstructionModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @Column({type: DataType.STRING, field: "REFERENCE_ID"})
    public reference_id: string;

    @Column({type: DataType.BIGINT, field: "AMOUNT"})
    public amount: number;

    @Column({type: DataType.STRING, field: "AUTHORISED_USER_ID"})
    public user_id: string;

    @Column({type: DataType.TINYINT, field: "TYPE"})
    public type: number;

    @Column({type: DataType.TINYINT, field: "STATUS"})
    public status: number;

    @CreatedAt
    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public create_ts: string;

    @UpdatedAt
    @Column({type: DataType.DATE, field: "UPDATE_TS"})
    public update_ts: string;

    @Column({type: DataType.STRING, field: "MODIFIED_BY"})
    public modified_by: string;

    @Column({type: DataType.BOOLEAN, field: "IS_REMOVED"})
    public is_removed: boolean;

    @Column({type: DataType.TINYINT, field: "REJECT_REASON"})
    public reject_reason: number;

    @HasMany(() => TransactionInstructionItemModel)
    public items: TransactionInstructionItemModel[];

}
