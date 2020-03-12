import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {SecurityHolderModel} from "./db.security-holder.model";
import {UserModel} from "./db.user.model";

@Table({tableName: "TRADER_ROLE", timestamps: false})
export class UserRoleModel extends Model<UserRoleModel> {
    @ForeignKey(() => UserModel)
    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "TRADER_ID"})
    public user_id: string;

    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "ROLE_ID"})
    public role_id: string;

    @Column({type: DataType.CHAR, field: "IS_AVAILABLE"})
    public is_available: string;

    @BelongsTo(() => UserModel)
    public user: UserModel;

    @ForeignKey(() => SecurityHolderModel)
    @Column({type: DataType.INTEGER, field: "ROLE_OBJECT_ID"})
    public role_object_id: number;

    @BelongsTo(() => SecurityHolderModel)
    public security_holder: SecurityHolderModel;
}
