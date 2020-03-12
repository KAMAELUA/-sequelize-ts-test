import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {PostCommentModel} from "./db.post-comment.model";

@Table({tableName: "post", timestamps: false})
export class PostModel extends Model<PostModel> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: number;

    @Column({type: DataType.STRING, field: "NAME"})
    public name: string;

    @HasMany(() => PostCommentModel)
    public comments: PostCommentModel[];
}
