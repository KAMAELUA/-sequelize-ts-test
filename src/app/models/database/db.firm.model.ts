import {BelongsToMany, Column, DataType, HasMany, Model, Scopes, Table} from "sequelize-typescript";
import {FirmContactModel} from "./db.firm-contact.model";
import {FirmDirectorModel} from "./db.firm-director.model";
import {SecurityHolderModel} from "./db.security-holder.model";
import {SecurityModel} from "./db.security.model";
import {UserModel} from "./db.user.model";

@Scopes(() => ({
    defaultScope: {
        attributes: ["id", "name", "description", "type", "enabled"],
        where: {enabled: 1},
    },
    full: {
        where: {enabled: 1},
        include: [{
            association: "contacts",
            attributes: {exclude: ["firm_id"]},
        }],
    },
}))
@Table({tableName: "FIRM", timestamps: false})
export class FirmModel extends Model<FirmModel> {
    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @Column({type: DataType.STRING, field: "NAME"})
    public name: string;

    @Column({type: DataType.STRING, field: "DESCRIPTION"})
    public description: string;

    @Column({type: DataType.INTEGER, field: "FIRM_TYPE"})
    public type: number;

    @Column({type: DataType.BOOLEAN, field: "ENABLED"})
    public enabled: boolean;

    @Column({type: DataType.STRING, field: "STREET"})
    public street: string;

    @Column({type: DataType.STRING, field: "CITY"})
    public city: string;

    @Column({type: DataType.STRING, field: "STATE_OR_PROVINCE"})
    public state_or_province: string;

    @Column({type: DataType.STRING, field: "COUNTRY"})
    public country: string;

    @Column({type: DataType.STRING, field: "POSTAL_CODE"})
    public postal_code: string;

    @Column({type: DataType.STRING, field: "INDUSTRY_SECTOR"})
    public industry_sector: string;

    @Column({type: DataType.STRING, field: "COMPANY_REGISTRATION_NO"})
    public company_registration_no: string;

    @Column({type: DataType.STRING, field: "REGISTRY_EMAIL"})
    public email: string;

    @HasMany(() => SecurityModel)
    public securities: SecurityModel[];

    @HasMany(() => UserModel)
    public users: UserModel[];

    @BelongsToMany(() => SecurityHolderModel, () => FirmDirectorModel)
    public directors: SecurityHolderModel[];

    @HasMany(() => FirmContactModel)
    public contacts: FirmContactModel[];
}
