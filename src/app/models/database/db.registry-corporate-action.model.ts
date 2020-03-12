import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";
import {CorporateActionMemberModel} from "./db.corporate-action-member.model";
import {ElectionMemberModel} from "./db.election-member.model";
import {ElectionResultModel} from "./db.election-result.model";

@Table({tableName: "REGISTRY_CORPORATE_ACTION", timestamps: false})
export class RegistryCorporateActionModel extends Model<RegistryCorporateActionModel> {
    @ForeignKey(() => AccountModel)
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @Column({type: DataType.STRING, field: "CORPORATE_ACTION_SCHEME_NAME"})
    public name: string;

    @Column({type: DataType.STRING, field: "SEC_ID"})
    public security_id: string;

    @Column({type: DataType.STRING, field: "DESCRIPTION"})
    public description: string;

    @Column({type: DataType.TINYINT, field: "STATUS"})
    public status: number;

    @Column({type: DataType.DATE, field: "DECLARATION_DATE"})
    public declaration_date: Date;

    @Column({type: DataType.TINYINT, field: "CORPORATE_ACTION_TYPE"})
    public type: number;

    @Column({type: DataType.TINYINT, field: "CORPORATE_ACTION_EVENT_TYPE"})
    public event_type: number;

    @Column({type: DataType.DECIMAL, field: "DWT_EXEMPT_AMOUNT_PER_SHARE"})
    public dwt_exempt_amount_per_share: number;

    @Column({type: DataType.STRING, field: "DWT_EXEMPT_PERCENT_OF_PRICE_PER_SHARE"})
    public dwt_exempt_percent_of_price_per_share: string;

    @Column({type: DataType.DATE, field: "FINALISATION_DATE"})
    public finalisation_date: Date;

    @Column({type: DataType.DATE, field: "PAYMENT_DATE"})
    public payment_date: Date;

    @Column({type: DataType.DATE, field: "FIRST_DAY_TO_TRADE"})
    public first_day_to_trade: Date;

    @Column({type: DataType.DATE, field: "LAST_DAY_TO_TRADE_DATE"})
    public last_day_to_trade_date: Date;

    @Column({type: DataType.TINYINT, field: "SHARE_RATIO_TYPE"})
    public share_ratio_type: number;

    @Column({type: DataType.DECIMAL, field: "SHARE_RATION"})
    public share_ration: number;

    @Column({type: DataType.TINYINT, field: "CASH_RATIO_TYPE"})
    public cash_ratio_type: number;

    @Column({type: DataType.DECIMAL, field: "CASH_RATION"})
    public cash_ration: number;

    @Column({type: DataType.BOOLEAN, field: "PAY_INTO_SHARE_HOLDER_BANK_ACCOUNT"})
    public pay_into_share_holder_bank_account: boolean;

    @Column({type: DataType.TINYINT, field: "ENTITLEMENT_TYPE_CASH"})
    public entitlement_type_cash: number;

    @Column({type: DataType.TINYINT, field: "ENTITLEMENT_TYPE_DEFAULT_OPTION"})
    public entitlement_type_default_option: number;

    @ForeignKey(() => AccountModel)
    @Column({type: DataType.STRING, field: "LEAD_ACCOUNT_ID"})
    public lead_account_id: string;

    @Column({type: DataType.DECIMAL, field: "MINORITY_THREASHOLD"})
    public minority_threashold: number;

    @Column({type: DataType.DECIMAL, field: "VALUE_OF_SECURITIES"})
    public value_of_securities: number;

    @Column({type: DataType.STRING, field: "ENTITLEMENT_TYPE_CASH"})
    public exchange: number;

    // @BelongsTo(() => SecurityHolderModel)
    // security_holder: SecurityHolderModel;

    @BelongsTo(() => AccountModel)
    public lead_account: AccountModel;

    @HasMany(() => CorporateActionMemberModel)
    public items: CorporateActionMemberModel;

    @HasMany(() => ElectionMemberModel)
    public election_members: ElectionMemberModel[];

    @HasMany(() => ElectionResultModel)
    public results: ElectionResultModel[];
}
