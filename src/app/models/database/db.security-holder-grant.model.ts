import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {AccountModel} from "./db.account.model";
import {SecurityHolderModel} from "./db.security-holder.model";

@Table({tableName: "SECURITY_HOLDER_ACCOUNTS", timestamps: false})
class SecurityHolderGrantModel extends Model<SecurityHolderGrantModel> {
    @ForeignKey(() => SecurityHolderModel)
    @Column({type: DataType.BIGINT, field: "ID_SECURITY_HOLDER"})
    public security_holder_id: number;

    @ForeignKey(() => AccountModel)
    @Column({type: DataType.STRING, field: "ACCOUNT"})
    public account_id: string;
}
