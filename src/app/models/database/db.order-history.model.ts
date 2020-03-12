import {Op} from "sequelize";
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
import {OrderModel} from "./db.order.model";
import {SecurityModel} from "./db.security.model";

@Scopes(() => ({
    defaultScope: {
        include: [
            {
                association: "security",
            },
        ],
        attributes: {exclude: ["security"]},
    },
    trades: {
        include: [
            {
                association: "security",
                attributes: ["id", "issuer_id", "denominator"],
            },
            {
                association: "order",
                attributes: ["id", "app_id", "account_id"],
                include: [{
                    association: "account",
                    attributes: ["id"],
                    include: [
                        {
                            association: "security_holder",
                            attributes: ["id", "first_name", "surname", "corporation_name", "corporation_type"],
                        },
                    ],
                }],
            },
        ],
        attributes: {exclude: ["security"]},
        where: {
            order_transaction_type: {[Op.or]: [3, 4]},
        },
    },
}))
@Table({tableName: "ORDER_HISTORY"})
export class OrderHistoryModel extends Model<OrderHistoryModel> {
    @Column({type: DataType.INTEGER, primaryKey: true, field: "TRANSACTION_ID"})
    public id: number;

    @Column({type: DataType.SMALLINT, primaryKey: true, field: "ROUTER_ID"})
    public router_id: number;

    @ForeignKey(() => OrderModel)
    @Column({type: DataType.INTEGER, field: "ROUTER_ORDER_ID"})
    public router_order_id: number;

    @Column({type: DataType.TINYINT, field: "ORDER_TRANSACTION_TYPE"})
    public order_transaction_type: number;

    @Column({type: DataType.STRING, field: "TRADE_ID"})
    public trade_id: string;

    @ForeignKey(() => SecurityModel)
    @Column({type: DataType.STRING, field: "SEC_ID"})
    public security_id: string;

    @Column({type: DataType.STRING, field: "SYMBOL"})
    public symbol: string;

    @Column({type: DataType.INTEGER, field: "LAST_QTY"})
    public qty: number;

    @Column({type: DataType.BOOLEAN, field: "ACTIVE"})
    public is_active: boolean;

    @Column({type: DataType.INTEGER, field: "FLAGS"})
    public flags: number;

    @CreatedAt
    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public create_ts: Date;

    @UpdatedAt
    @Column({type: DataType.DATE, field: "UPDATE_TS"})
    public update_ts: Date;

    @BelongsTo(() => OrderModel, {
        scope: {
            app_id: {[Op.col]: "OrderHistoryModel.ROUTER_ID"},
        },
    })
    public order: OrderModel;

    @BelongsTo(() => SecurityModel)
    public security: SecurityModel;

    @Column({type: DataType.VIRTUAL})
    public get issuer_id(this: OrderHistoryModel) {
        return this.security.issuer_id;
    }

    @Column({type: DataType.VIRTUAL})
    public get security_holder_id(this: OrderHistoryModel) {
        return this.order.account?.security_holder?.id;
    }

    @Column({type: DataType.VIRTUAL})
    public get security_holder_first_name(this: OrderHistoryModel) {
        return this.order.account?.security_holder?.first_name;
    }

    @Column({type: DataType.VIRTUAL})
    public get security_holder_surname(this: OrderHistoryModel) {
        return this.order.account?.security_holder?.surname;
    }

    @Column({type: DataType.VIRTUAL})
    public get security_holder_corp_name(this: OrderHistoryModel) {
        return this.order.account?.security_holder?.corporation_name;
    }

    @Column({type: DataType.VIRTUAL})
    public get security_holder_corp_type(this: OrderHistoryModel) {
        return this.order?.account?.security_holder?.corporation_type;
    }

    @Column({type: DataType.DECIMAL, field: "LAST_PRICE"})
    public get price(this: OrderHistoryModel): number {
        return this.getDataValue("price") / this.security.denominator;
    }

    @Column({type: DataType.VIRTUAL})
    public get value(this: OrderHistoryModel): number {
        return this.price * this.qty;
    }

    @Column({type: DataType.VIRTUAL})
    public get account_id(this: OrderHistoryModel): string {
        return this.order?.account_id;
    }

    @Column({type: DataType.VIRTUAL})
    public get is_director_trade(this: OrderHistoryModel): boolean {
        return !!(this.flags & 1 << 8);
    }
}
