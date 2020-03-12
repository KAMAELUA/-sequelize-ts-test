import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Scopes, Table} from "sequelize-typescript";
import {FirmModel} from "./db.firm.model";
import {PositionModel} from "./db.position.model";
import {VotingModel} from "./db.voting.model";

@Scopes(() => ({
    notExpired: {
        where: {is_expired: 0},
    },
}))
@Table({tableName: "INSTRUMENT", timestamps: false})
export class SecurityModel extends Model<SecurityModel> {
    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "SEC_ID"})
    public id: string;

    @Column({type: DataType.STRING, field: "DESCRIPTION"})
    public description: string;

    @Column({type: DataType.TINYINT, field: "INSTR_TYPE"})
    public type: number;

    @Column({type: DataType.STRING, field: "SYMBOL"})
    public symbol: number;

    @Column({type: DataType.STRING, field: "CURRENCY"})
    public currency: string;

    @Column({type: DataType.DECIMAL, field: "TICKER_SIZE"})
    public ticker_size: number;

    @Column({type: DataType.DECIMAL, field: "TICK_VALUE"})
    public tick_value: number;

    @Column({type: DataType.INTEGER, field: "TICK_LOT"})
    public tick_lot: number;

    @Column({type: DataType.INTEGER, field: "DENOMINATOR"})
    public denominator: number;

    @Column({type: DataType.INTEGER, field: "MARKET_STATE"})
    public market_state: number;

    @ForeignKey(() => FirmModel)
    @Column({type: DataType.STRING, field: "ISSUER_ID"})
    public issuer_id: string;

    @Column({type: DataType.BIGINT, field: "ISSUE_SHARES"})
    public issue_shares: string;

    @Column({type: DataType.STRING, field: "ISIN"})
    public isin: string;

    @Column({type: DataType.DATE, field: "ACTIVATION", allowNull: true})
    public activation_date: Date;

    @Column({type: DataType.DATE, field: "EXPIRATION", allowNull: true})
    public expiration_date: Date;

    @Column({type: DataType.DATE, field: "MATURITY", allowNull: true})
    public maturity_date: Date;

    @Column({type: DataType.BOOLEAN, field: "EXPIRED"})
    public is_expired: boolean;

    @BelongsTo(() => FirmModel)
    public firm: FirmModel;

    @HasMany(() => PositionModel)
    public positions: PositionModel[];

    @HasMany(() => VotingModel)
    public votings: VotingModel[];
}
