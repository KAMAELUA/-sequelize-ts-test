import {fn} from "sequelize";
import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Scopes, Table} from "sequelize-typescript";
import {VotingItemResultModel} from "./db.voting-item-result.model";
import {VotingModel} from "./db.voting.model";

@Scopes(() => ({
    withResults: {

        include: [
            {
                attributes: ["id", [fn("COUNT", "id"), "plus"]],
                association: "results",
                where: {
                    option: 1,
                },
            },
        ],
    },
}))
@Table({tableName: "VOTING_ITEM", timestamps: false})
export class VotingItemModel extends Model<VotingItemModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @Column({type: DataType.TINYINT, field: "RESOLUTION_TYPE"})
    public resolution_type: number;

    @Column({type: DataType.STRING, field: "NUMBER"})
    public number: string;

    @Column({type: DataType.STRING, field: "DESCRIPTION"})
    public description: string;

    @ForeignKey(() => VotingModel)
    @Column({type: DataType.INTEGER, field: "ID_VOTING"})
    public voting_id: string;

    @Column({type: DataType.FLOAT, field: "PASS_REQUIRED"})
    public pass_required: number;

    @BelongsTo(() => VotingModel)
    public voting: VotingModel;

    @HasMany(() => VotingItemResultModel)
    public results: VotingItemResultModel[];
}
