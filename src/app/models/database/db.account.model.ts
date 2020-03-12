import {Op} from "sequelize";
import {
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import {AccountGrantModel} from "./db.account-grant.model";
import {AccountTransactionModel} from "./db.account-transaction.model";
import {ElectionMemberModel} from "./db.election-member.model";
import {OrderModel} from "./db.order.model";
import {PositionModel} from "./db.position.model";
import {SecurityHolderModel} from "./db.security-holder.model";
import {UserModel} from "./db.user.model";
import {VotingMemberModel} from "./db.voting-member.model";

@Table({tableName: "ACCOUNT", timestamps: false})
export class AccountModel extends Model<AccountModel> {
    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "ACCT"})
    public id: string;

    @ForeignKey(() => SecurityHolderModel)
    @Column({type: DataType.STRING, field: "REGISTRY_INVESTOR_ID"})
    public security_holder_id: string;

    @Column({type: DataType.STRING, field: "FIRM_ID"})
    public firm_id: string;

    @Column({type: DataType.STRING, field: "CCY"})
    public currency: string;

    @Column({type: DataType.TINYINT, field: "STATUS"})
    public status: string;

    @Column({type: DataType.DECIMAL, field: "NET_ASSET_VALUE"})
    public net_asset_value: number;

    @Column({type: DataType.DECIMAL, field: "AVAILABLE_MARGIN"})
    public available_margin: number;

    @Column({type: DataType.DECIMAL, field: "USED_MARGIN"})
    public used_margin: number;

    @Column({type: DataType.DECIMAL, field: "BALANCE"})
    public balance: number;

    @Column({type: DataType.DECIMAL, field: "REALIZED_PROFIT_LOSS"})
    public rpl: number;

    @Column({type: DataType.DECIMAL, field: "UNREALIZED_PROFIT_LOSS"})
    public upl: number;

    @Column({type: DataType.DECIMAL, field: "TOTAL_POSITION_VALUE"})
    public total_position_value: number;

    @Column({type: DataType.DECIMAL, field: "INITIAL_MARGIN"})
    public initial_margin: number;

    @Column({type: DataType.DECIMAL, field: "MAINTENANCE_MARGIN"})
    public maintenance_margin: number;

    @Column({type: DataType.DECIMAL, field: "LOCKED_CASH"})
    public locked_cash: number;

    @Column({type: DataType.TINYINT, field: "CLIENT_GROUP_CODE"})
    public client_group_code: number;

    @CreatedAt
    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public create_ts: Date;

    @UpdatedAt
    @Column({type: DataType.DATE, field: "UPDATE_TS"})
    public update_ts: Date;

    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public open_date: Date;

    @Column({type: DataType.DATE, field: "UPDATE_TS"})
    public close_date: Date;

    @BelongsToMany(() => UserModel, {
        through: {
            model: () => AccountGrantModel,
            scope: {
                granted_object_type: {[Op.or]: [2, 255]},
            },
        },
    })
    public users: UserModel[];

    @BelongsTo(() => SecurityHolderModel)
    public security_holder: SecurityHolderModel;

    @HasMany(() => AccountTransactionModel)
    public transactions: AccountTransactionModel[];

    @HasMany(() => PositionModel)
    public positions: PositionModel[];

    @HasMany(() => VotingMemberModel)
    public voting_members: VotingMemberModel[];

    @HasMany(() => ElectionMemberModel)
    public elections_membership: ElectionMemberModel[];

    @HasMany(() => OrderModel)
    public orders: OrderModel[];

    @Column({type: DataType.VIRTUAL})
    public get available_cash(this: AccountModel) {
        return this.balance - this.locked_cash;
    }

    public toJSON(): object {
        const json = super.toJSON();
        delete json["AccountGrantModel"];
        return json;
    }
}
