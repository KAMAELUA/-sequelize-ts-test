import {BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";

@Table({tableName: "V_TRANSACTION_LOG", timestamps: false})
export class AccountTransactionModel extends Model<AccountTransactionModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: true, field: "TRANSACTION_ID"})
    public id: string;

    @Column({type: DataType.BIGINT, field: "PARENT_TRANSACTION_ID", allowNull: true})
    public parent_transaction_id: string;

    @ForeignKey(() => AccountModel)
    @Column({type: DataType.STRING, field: "ACCT"})
    public account_id: string;

    @Column({type: DataType.STRING, field: "FIRM_ID"})
    public firm_id: string;

    @Column({type: DataType.STRING, field: "TRADER_ID", allowNull: true})
    public trader_id: string;

    @Column({type: DataType.STRING, field: "SEC_ID", allowNull: true})
    public security_id: string;

    @Column({type: DataType.STRING, field: "SYMBOL", allowNull: true})
    public symbol: string;

    @Column({type: DataType.STRING, field: "REPORT_CODE"})
    public report_code: string;

    @Column({type: DataType.INTEGER, field: "TRANSACTION_DESCRIPTION"})
    public description: number;

    @CreatedAt
    @Column({type: DataType.DATE, field: "TRANSACTION_DATE"})
    public transaction_date: number;

    @Column({type: DataType.INTEGER, field: "LAST_QTY", allowNull: true})
    public qty: number;

    @Column({type: DataType.DECIMAL, field: "LAST_PRICE", allowNull: true})
    public price: number;

    @Column({type: DataType.STRING, field: "TRADE_ID", allowNull: true})
    public trade_id: string;

    @Column({type: DataType.TINYINT, field: "TRANSACTION_TYPE"})
    public type: number;

    @Column({type: DataType.TINYINT, field: "TRANSACTION_SUB_TYPE"})
    public sub_type: number;

    @Column({type: DataType.DECIMAL, field: "AMOUNT"})
    public amount: number;

    @Column({type: DataType.DECIMAL, field: "BALANCE"})
    public balance: number;

    @Column({type: DataType.DECIMAL, field: "LOCKED_CASH"})
    public locked_cash: number;

    @Column({type: DataType.DECIMAL, field: "NET_ASSET_VALUE"})
    public net_asset_value: number;

    @Column({type: DataType.BIGINT, field: "ACCOUNT_TRANSFER_ID"})
    public account_transfer_id: string;

    @Column({type: DataType.STRING, field: "REGISTRY_INVESTOR_ID"})
    public security_holder_id: string;

    @BelongsTo(() => AccountModel)
    public account: AccountModel;

}
