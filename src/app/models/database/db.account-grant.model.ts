import {Column, DataType, ForeignKey, Model, Scopes, Table} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";
import {UserModel} from "./db.user.model";

@Table({tableName: "GRANTS", timestamps: false})
export class AccountGrantModel extends Model<AccountGrantModel> {
    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: string;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.STRING, field: "USER"})
    public user_id: number;

    @ForeignKey(() => AccountModel)
    @Column({type: DataType.STRING, field: "GRANTED_OBJECT_ID"})
    public account_id: string;

    @Column({type: DataType.INTEGER, field: "GRANTED_OBJECT_TYPE"})
    public granted_object_type: number;
}
