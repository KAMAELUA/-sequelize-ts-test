import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    Scopes,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";
import {SecurityModel} from "./db.security.model";

@Scopes(() => ({
    defaultScope: {
        include: [
            {
                attributes: ["id", "issuer_id"],
                association: "security",
            },
            {
                attributes: ["id", "firm_id"],
                association: "account",
                include: [
                    {
                        attributes: ["id"],
                        association: "users",
                    },
                    {
                        attributes: ["id"],
                        association: "security_holder",
                    },
                ],
            },
        ],
    },
}))
@Table({tableName: "POSITION", timestamps: false})
export class PositionModel extends Model<PositionModel> {
    @ForeignKey(() => AccountModel)
    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "ACCT"})
    public account_id: string;

    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "EXCH_DESTINATION_ID"})
    public exchange: string;

    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "INSTR_ID"})
    public symbol: string;

    @Column({type: DataType.INTEGER, field: "QTY"})
    public qty: number;

    @ForeignKey(() => SecurityModel)
    @Column({type: DataType.STRING, field: "SECURITY_ID"})
    public security_id: string;

    @Column({type: DataType.TINYINT, field: "INSTR_TYPE"})
    public sec_type: number;

    @Column({type: DataType.DECIMAL, field: "VALUE"})
    public value: number;

    @Column({type: DataType.DECIMAL, field: "AVERAGE_PRICE"})
    public average_price: number;

    @Column({type: DataType.DECIMAL, field: "LIQUIDATION_PRICE"})
    public liquidation_price: number;

    @Column({type: DataType.DECIMAL, field: "UNREALIZED_P_L"})
    public unrealized_p_l: number;

    @Column({type: DataType.DECIMAL, field: "REALIZED_P_L"})
    public realuzed_p_l: number;

    @Column({type: DataType.INTEGER, field: "WRK_BUYS"})
    public wrk_buys: number;

    @Column({type: DataType.INTEGER, field: "WRK_SELLS"})
    public wrk_sells: number;

    @Column({type: DataType.INTEGER, field: "WRK_BUY_ORDERS"})
    public wrk_buy_orders: number;

    @Column({type: DataType.INTEGER, field: "WRK_SELL_ORDERS"})
    public wrk_sell_orders: number;

    @Column({type: DataType.DECIMAL, field: "LOCKED_CASH"})
    public locked_cash: number;

    @Column({type: DataType.INTEGER, field: "ENCUMBRANCE_QTY"})
    public locked_qty: number;

    @Column({type: DataType.INTEGER, field: "CERTIFICATED_SHARES"})
    public materialized_qty: number;

    @Column({type: DataType.INTEGER, field: "UNSETTLED_QTY"})
    public unsettled_qty: number;

    @Column({type: DataType.VIRTUAL})
    public get available_qty(this: PositionModel): number {
        return this.qty - this.unsettled_qty - this.locked_qty;
    }

    @Column({type: DataType.VIRTUAL})
    public get firm_id(this: PositionModel): string {
        return this.account?.firm_id;
    }

    @Column({type: DataType.VIRTUAL})
    public get security_holder_id(this: PositionModel): string {
        return this.account?.security_holder?.id;
    }

    @Column({type: DataType.VIRTUAL})
    public get issuer_id(this: PositionModel): string {
        return this.security?.issuer_id;
    }

    @CreatedAt
    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public create_ts: Date;

    @UpdatedAt
    @Column({type: DataType.DATE, field: "UPDATE_TS"})
    public update_ts: Date;

    @BelongsTo(() => SecurityModel)
    public security: SecurityModel;

    @BelongsTo(() => AccountModel)
    public account: AccountModel;
}
