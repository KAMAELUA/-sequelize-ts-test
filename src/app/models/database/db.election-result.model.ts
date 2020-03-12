import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ElectionMemberModel} from "./db.election-member.model";
import {RegistryCorporateActionModel} from "./db.registry-corporate-action.model";
import {SecurityHolderModel} from "./db.security-holder.model";
import {UserModel} from "./db.user.model";

@Table({tableName: "ELECTION_RESULTS", timestamps: false})
export class ElectionResultModel extends Model<ElectionResultModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @Column({type: DataType.TINYINT, field: "ELECTION_OPTION"})
    public election_option: number;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.STRING, field: "TRADER_ID"})
    public user_id: string;

    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public create_ts: Date;

    @Column({type: DataType.DATE, field: "UPDATE_TS"})
    public update_ts: Date;

    @Column({type: DataType.BOOLEAN, field: "IS_ACCEPTED"})
    public is_accepted: boolean;

    @Column({type: DataType.STRING, field: "COMMENT"})
    public comment: string;

    @ForeignKey(() => RegistryCorporateActionModel)
    @Column({type: DataType.BIGINT, field: "CORPORATE_ACTION_ID"})
    public corporate_action_id: string;

    @ForeignKey(() => SecurityHolderModel)
    @Column({type: DataType.BIGINT, field: "SECURITY_HOLDER_ID"})
    public security_holder_id: string;

    @Column({type: DataType.BOOLEAN, field: "IS_INACTIVE"})
    public is_inactive: boolean;

    @ForeignKey(() => ElectionMemberModel)
    @Column({type: DataType.BIGINT, field: "ELECTION_MEMBER_ID"})
    public election_member_id: string;

    @BelongsTo(() => RegistryCorporateActionModel)
    public election: RegistryCorporateActionModel;

    @BelongsTo(() => SecurityHolderModel)
    public security_holder: SecurityHolderModel;

    @BelongsTo(() => UserModel)
    public user: UserModel;

    @BelongsTo(() => ElectionMemberModel)
    public election_member: ElectionMemberModel;
}
