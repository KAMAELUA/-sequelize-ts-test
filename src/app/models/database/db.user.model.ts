import {Op} from "sequelize";
import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {AccountGrantModel} from "./db.account-grant.model";
import {AccountModel} from "./db.account.model";
import {FirmModel} from "./db.firm.model";
import {UserRoleModel} from "./db.user-role.model";

@Table({tableName: "TRADER", timestamps: false})
export class UserModel extends Model<UserModel> {
    @Column({type: DataType.STRING, primaryKey: true, autoIncrement: false, field: "TRADER_ID"})
    public id: string;

    @Column({type: DataType.STRING, field: "EMAIL"})
    public email: string;

    @Column({type: DataType.STRING, field: "NAME"})
    public name: string;

    @Column({type: DataType.STRING, field: "LAST_NAME"})
    public surname: string;

    @HasOne(() => UserRoleModel)
    public role: UserRoleModel;

    @BelongsToMany(() => AccountModel, {
        through: {
            model: () => AccountGrantModel,
            scope: {
                granted_object_type: {[Op.or]: [2, 255]},
            },
        },
    })
    public accounts: AccountModel[];

    @ForeignKey(() => FirmModel)
    @Column({type: DataType.STRING, field: "FIRM_ID"})
    public firm_id: string;

    @BelongsTo(() => FirmModel)
    public firm: FirmModel;
}
