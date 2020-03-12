import {Op} from "sequelize";
import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";
import {OrderHistoryModel} from "./db.order-history.model";

@Table({tableName: "ROUTE_ORDER"})
export class OrderModel extends Model<OrderModel> {
    @Column({type: DataType.INTEGER, primaryKey: true, field: "ROUTER_ORDER_ID"})
    public id: number;

    @Column({type: DataType.INTEGER, field: "APP_ID"})
    public app_id: number;

    @Column({type: DataType.STRING, field: "TRADER_ID"})
    public user_id: number;

    @Column({type: DataType.STRING, field: "SEC_ID"})
    public security_id: string;

    @Column({type: DataType.TINYINT, field: "ORDER_TYPE"})
    public type: string;

    @Column({type: DataType.TINYINT, field: "TIME_IN_FORCE"})
    public time_in_force: string;

    @Column({type: DataType.TINYINT, field: "STATUS"})
    public status: string;

    @ForeignKey(() => AccountModel)
    @Column({type: DataType.STRING, field: "ACCOUNT"})
    public account_id: string;

    @CreatedAt
    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public create_ts: Date;

    @UpdatedAt
    @Column({type: DataType.DATE, field: "UPDATE_TS"})
    public update_ts: Date;

    @HasMany(() => OrderHistoryModel,
        {
            foreignKey: "router_order_id",
            scope: {router_id: {[Op.col]: "OrderModel.APP_ID"}},
        })
    public history: OrderHistoryModel[];

    @HasMany(() => OrderHistoryModel,
        {
            foreignKey: "router_order_id",
            scope: {router_id: {[Op.col]: "OrderModel.APP_ID"}, order_transaction_type: {[Op.or]: [3, 4]}},
        })
    public trades: OrderHistoryModel[];

    @BelongsTo(() => AccountModel)
    public account: AccountModel;
}
