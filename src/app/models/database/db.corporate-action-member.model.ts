import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {RegistryCorporateActionModel} from "./db.registry-corporate-action.model";
import {SecurityHolderModel} from "./db.security-holder.model";

@Table({tableName: "CORPORATE_ACTION_MEMBER", timestamps: false})
export class CorporateActionMemberModel extends Model<CorporateActionMemberModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @ForeignKey(() => RegistryCorporateActionModel)
    @Column({type: DataType.BIGINT, field: "CORPORATE_ACTION_ID"})
    public corporate_action_id: string;

    @ForeignKey(() => SecurityHolderModel)
    @Column({type: DataType.BIGINT, field: "SECURITY_HOLDER_ID"})
    public security_holder_id: string;

    @Column({type: DataType.INTEGER, field: "NUMBER_OF_SHARES"})
    public number_of_shares: number;

    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public create_ts: Date;

    @BelongsTo(() => RegistryCorporateActionModel)
    public corporate_action: RegistryCorporateActionModel;

    @BelongsTo(() => SecurityHolderModel)
    public security_holder: SecurityHolderModel;
}
