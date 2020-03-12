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
import {SecurityModel} from "./db.security.model";
import {VotingItemModel} from "./db.voting-item.model";
import {VotingMemberModel} from "./db.voting-member.model";

@Table({tableName: "VOTING", timestamps: true})
export class VotingModel extends Model<VotingModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @ForeignKey(() => SecurityModel)
    @Column({type: DataType.STRING, field: "SEC_ID"})
    public security_id: string;

    @Column({type: DataType.STRING, field: "RESOLUTION_EVENT_NAME"})
    public resolution_event_name: string;

    @Column({type: DataType.STRING, field: "DESCRIPTION"})
    public description: string;

    @Column({type: DataType.DATE, field: "LASTVOTINGDATE"})
    public last_voting_date: Date;

    @Column({type: DataType.DATE, field: "ACTIVATIONDATE"})
    public activation_data: Date;

    @Column({type: DataType.FLOAT, field: "QUORUM"})
    public quorum: number;

    @Column({type: DataType.TINYINT, field: "STATUS"})
    public status: number;

    @CreatedAt
    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public created_at: Date;

    @UpdatedAt
    @Column({type: DataType.DATE, field: "UPDATE_TS"})
    public updated_at: Date;

    @BelongsTo(() => SecurityModel)
    public security: SecurityModel;

    @HasMany(() => VotingItemModel)
    public items: VotingItemModel[];

    @HasMany(() => VotingMemberModel)
    public members: VotingMemberModel[];
}
