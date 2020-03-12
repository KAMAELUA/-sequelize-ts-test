import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";
import {VotingItemResultModel} from "./db.voting-item-result.model";
import {VotingModel} from "./db.voting.model";

@Table({tableName: "VOTING_MEMBER", timestamps: false})
export class VotingMemberModel extends Model<VotingMemberModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @ForeignKey(() => VotingModel)
    @Column({type: DataType.BIGINT, field: "VOTING_ID"})
    public voting_id: string;

    @ForeignKey(() => AccountModel)
    @Column({type: DataType.STRING, field: "ACC"})
    public account_id: string;

    @Column({type: DataType.DECIMAL, field: "QTY"})
    public qty: number;

    @BelongsTo(() => VotingModel)
    public voting: VotingModel;

    @BelongsTo(() => AccountModel)
    public account: AccountModel;

    @HasMany(() => VotingItemResultModel)
    public results: VotingItemResultModel[];
}
