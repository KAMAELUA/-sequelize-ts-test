import {BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {VotingItemModel} from "./db.voting-item.model";
import {VotingMemberModel} from "./db.voting-member.model";

@Table({tableName: "VOTING_RESULTS", timestamps: false})
export class VotingItemResultModel extends Model<VotingItemResultModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @ForeignKey(() => VotingItemModel)
    @Column({type: DataType.TINYINT, field: "VOTING_ITEM_ID"})
    public voting_item_id: number;

    @Column({type: DataType.BIGINT, field: "SECURITY_HOLDER_ID"})
    public security_holder_id: string;

    @Column({type: DataType.BIGINT, field: "TRADER_ID"})
    public trader_id: string;

    @Column({type: DataType.DATE, field: "VOTING_DATE"})
    public voting_date: number;

    @Column({type: DataType.TINYINT, field: "VOTE_OPTION"})
    public option: number;

    @Column({type: DataType.BOOLEAN, field: "IS_INACTIVE", allowNull: true})
    public is_inactive: boolean;

    @ForeignKey(() => VotingMemberModel)
    @Column({type: DataType.BIGINT, field: "VOTING_MEMBER_ID"})
    public voting_member_id: boolean;

    @CreatedAt
    @Column({type: DataType.DATE, field: "CREATE_TS"})
    public created_at: Date;

    @Column({type: DataType.STRING, field: "COMMENT"})
    public comment: string;

    @BelongsTo(() => VotingItemModel)
    public voting_item: VotingItemModel;

    @BelongsTo(() => VotingMemberModel)
    public member: VotingMemberModel;
}
