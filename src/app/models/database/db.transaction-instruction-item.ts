import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";
import {TransactionInstructionModel} from "./db.transaction-instruction";

@Table({tableName: "TRANSACTION_INSTRUCTION_ITEM", timestamps: false})
export class TransactionInstructionItemModel extends Model<TransactionInstructionItemModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: true, field: "ID"})
    public id: string;

    @ForeignKey(() => TransactionInstructionModel)
    @Column({type: DataType.BIGINT, field: "TRANSACTION_INSTRUCTION_ID"})
    public transaction_instruction_id: string;

    @ForeignKey(() => AccountModel)
    @Column({type: DataType.STRING, field: "ACCOUNT"})
    public account_id: string;

    @Column({type: DataType.DECIMAL, field: "AMOUNT"})
    public amount: number;

    @Column({type: DataType.STRING, field: "BROKER_REFERENCE_ID"})
    public broker_reference_id: string;

    @BelongsTo(() => TransactionInstructionModel)
    public instruction: TransactionInstructionModel;

    @BelongsTo(() => AccountModel)
    public account: AccountModel;
}
