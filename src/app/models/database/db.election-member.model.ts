import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";
import {ElectionResultModel} from "./db.election-result.model";
import {RegistryCorporateActionModel} from "./db.registry-corporate-action.model";

@Table({tableName: "ELECTION_MEMBER", timestamps: false})
export class ElectionMemberModel extends Model<ElectionMemberModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @ForeignKey(() => AccountModel)
    @Column({type: DataType.STRING, field: "ACCOUNT_ID"})
    public account_id: string;

    @Column({type: DataType.DECIMAL, field: "QTY"})
    public qty: number;

    @ForeignKey(() => RegistryCorporateActionModel)
    @Column({type: DataType.BIGINT, field: "CORPORATE_ACTION_ID"})
    public corporate_action_id: string;

    @BelongsTo(() => AccountModel)
    public account: AccountModel;

    @BelongsTo(() => RegistryCorporateActionModel)
    public election: RegistryCorporateActionModel;

    @HasOne(() => ElectionResultModel)
    public result: ElectionResultModel;
}
