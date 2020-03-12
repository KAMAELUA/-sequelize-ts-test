import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {PostModel} from "./db.post.model";

@Table({tableName: "post_comment", timestamps: false})
export class PostCommentModel extends Model<PostCommentModel> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: false, field: "ID"})
    public id: number;

    @ForeignKey(() => PostModel)
    @Column({type: DataType.INTEGER, field: "POST_ID"})
    public post_id: number;

    @Column({type: DataType.STRING, field: "AUTHOR"})
    public author: string;

    @BelongsTo(() => PostModel)
    public post: PostModel;
}
