import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {FirmModel} from "./db.firm.model";

@Table({tableName: "FIRM_CONTACTS", timestamps: false})
export class FirmContactModel extends Model<FirmContactModel> {
    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: true, field: "ID"})
    public id: string;

    @ForeignKey(() => FirmModel)
    @Column({type: DataType.STRING, field: "FIRM_ID"})
    public firm_id: string;

    @Column({type: DataType.STRING, field: "CONTACT_PERSON"})
    public contact_person: string;

    @Column({type: DataType.STRING, field: "CITY"})
    public city: string;

    @Column({type: DataType.STRING, field: "COUNTRY"})
    public country: string;

    @Column({type: DataType.STRING, field: "PHONE"})
    public phone: string;

    @Column({type: DataType.STRING, field: "EMAIL"})
    public email: string;

    @Column({type: DataType.STRING, field: "FAX_NUMBER"})
    public fax_number: string;

    @Column({type: DataType.STRING, field: "ADDRESS"})
    public address: string;

    @Column({type: DataType.STRING, field: "POSTAL_CODE"})
    public postal_code: string;

    @Column({type: DataType.STRING, field: "STATE_OR_PROVINCE"})
    public state_or_province: string;

    @BelongsTo(() => FirmModel)
    public firm: FirmModel[];
}
