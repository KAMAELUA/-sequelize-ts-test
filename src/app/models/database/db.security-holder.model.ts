import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Scopes, Table} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";
import {CorporateActionMemberModel} from "./db.corporate-action-member.model";
import {FirmDirectorModel} from "./db.firm-director.model";
import {FirmModel} from "./db.firm.model";
import {UserRoleModel} from "./db.user-role.model";

@Scopes(() => ({
    defaultScope: {
        attributes: ["id", "investor_type", "corporation_type", "title", "first_name", "surname", "id_type", "email"],
    },
}))
@Table({tableName: "SECURITY_HOLDER", timestamps: false})
export class SecurityHolderModel extends Model<SecurityHolderModel> {
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false, field: "ID_SECURITY_HOLDER"})
    public id: string;

    @Column({type: DataType.TINYINT, field: "INVESTOR_TYPE"})
    public investor_type: number;

    @Column({type: DataType.TINYINT, field: "CORPORATION_TYPE"})
    public corporation_type: number;

    @Column({type: DataType.STRING, field: "CORPORATION_NAME"})
    public corporation_name: string;

    @Column({type: DataType.TINYINT, field: "TITLE"})
    public title: number;

    @Column({type: DataType.DATEONLY, field: "DATE_OF_BIRTH"})
    public date_of_birth: Date;

    @Column({type: DataType.TINYINT, field: "GENDER"})
    public gender: number;

    @Column({type: DataType.STRING, field: "FIRST_NAME"})
    public first_name: string;

    @Column({type: DataType.STRING, field: "SURNAME"})
    public surname: string;

    @Column({type: DataType.TINYINT, field: "ID_TYPE"})
    public id_type: number;

    @Column({type: DataType.STRING, field: "ID_NUMBER"})
    public id_number: string;

    @Column({type: DataType.STRING, field: "TAX_NUMBER"})
    public tax_number: string;

    @Column({type: DataType.DECIMAL, field: "TAX_RATE"})
    public tax_rate: number;

    @Column({type: DataType.STRING, field: "CELL_PHONE_NUMBER"})
    public cell_phone_number: string;

    @Column({type: DataType.STRING, field: "RESIDENTIAL_ADDRESS"})
    public residential_address: string;

    @Column({type: DataType.STRING, field: "RESIDENTIAL_ADDRESSS_CITY"})
    public residential_address_city: string;

    @Column({type: DataType.STRING, field: "WARD"})
    public ward: string;

    @Column({type: DataType.STRING, field: "POSTAL_ADDRESS"})
    public postal_address: string;

    @Column({type: DataType.STRING, field: "POSTAL_ADDRESS_CITY"})
    public postal_address_city: string;

    @Column({type: DataType.STRING, field: "POSTAL_CODE"})
    public postal_code: string;

    @Column({type: DataType.STRING, field: "NATIONALITY"})
    public nationality: string;

    @Column({type: DataType.INTEGER, field: "COUNTRY_OF_DOMICILE"})
    public country_of_domicile: number;

    @Column({type: DataType.STRING, field: "EMAIL"})
    public email: string;

    @Column({type: DataType.TINYINT, field: "COMUNICATION_PREFERENCE"})
    public communication_preference: number;

    @Column({type: DataType.STRING, field: "ID_BANK"})
    public bank_name: string;

    @Column({type: DataType.STRING, field: "BRANCH_CODE"})
    public branch_code: string;

    @Column({type: DataType.STRING, field: "BRANCH_NAME"})
    public branch_name: string;

    @Column({type: DataType.STRING, field: "ACCOUNT_NAME"})
    public account_name: string;

    @Column({type: DataType.STRING, field: "ACCOUNT_TYPE"})
    public account_type: string;

    @Column({type: DataType.STRING, field: "ACCOUNT_NUMBER"})
    public account_number: string;

    @Column({type: DataType.DECIMAL, field: "TAKE_ON_VALUE"})
    public take_on_value: number;

    @Column({type: DataType.DECIMAL, field: "WAUC"})
    public wauc: number;

    @Column({type: DataType.STRING, field: "DWT_EXEMPT_CODE"})
    public dwt_exempt_code: string;

    @Column({type: DataType.DECIMAL, field: "DWT_OVERRIDE_PERCENT"})
    public dwt_override_percent: number;

    @Column({type: DataType.TINYINT, field: "RECEIVE_ANNOUNCEMENTS_PREFERENCE"})
    public receive_announcements_preference: number;

    @Column({type: DataType.BOOLEAN, field: "FICA_STATUS"})
    public fica_status: boolean;

    @HasMany(() => AccountModel)
    public accounts: AccountModel[];

    @HasOne(() => UserRoleModel)
    public role: UserRoleModel;

    @BelongsToMany(() => FirmModel, () => FirmDirectorModel)
    public firm_director: FirmDirectorModel[];

    @HasMany(() => CorporateActionMemberModel)
    public member_in_actions: CorporateActionMemberModel;
}
