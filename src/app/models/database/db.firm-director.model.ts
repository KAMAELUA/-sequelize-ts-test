import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {FirmModel} from "./db.firm.model";
import {SecurityHolderModel} from "./db.security-holder.model";

@Table({tableName: "DIRECTOR", timestamps: false})
export class FirmDirectorModel extends Model<FirmDirectorModel> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: number;

    @Column({type: DataType.TINYINT, field: "RELATIONSHIP"})
    public relationship: number;

    @Column({type: DataType.STRING, field: "DIRECTOR_TYPE"})
    public type: string;

    @Column({type: DataType.TINYINT, field: "ACTIVE"})
    public active: number;

    @Column({type: DataType.DATE, field: "ACTIVATION_DATE"})
    public activation_date: Date;

    @Column({type: DataType.DATE, field: "APPOINTMENT_DATE"})
    public assign_date: Date;

    @Column({type: DataType.STRING, field: "UNAPPOINTMENT_DATE"})
    public unassign_date: Date;

    @Column({type: DataType.STRING, field: "DEACTIVATION_REASON"})
    public deactivation_reason: string;

    @ForeignKey(() => SecurityHolderModel)
    @Column({type: DataType.INTEGER, field: "SECURITY_HOLDER_ID"})
    public security_holder_id: number;

    @ForeignKey(() => FirmModel)
    @Column({type: DataType.STRING, field: "FIRM_ID"})
    public firm_id: string;

    @BelongsTo(() => SecurityHolderModel)
    public security_holder: SecurityHolderModel;

    @BelongsTo(() => FirmModel)
    public firm: FirmModel;
}
