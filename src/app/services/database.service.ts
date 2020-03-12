import {Injectable} from "@angular/core";
import mysql2 from "mysql2";
import sequelize from "sequelize";
import {Sequelize} from "sequelize-typescript";
import * as tedious from "tedious";
import * as DbModels from "../models/database";
import {Configuration} from "../static/configuration";

@Injectable({
    providedIn: "root",
})
export class DatabaseService {
    public sequelize: Sequelize;
    public dialect: "mysql" | "mssql";

    constructor() {
        this.init().then();
    }

    public async init() {
        if (Configuration.database.dialect === "mssql") {
            sequelize.DATE.prototype._stringify = function _stringify(date, options) {
                return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss.SSS");
            };
        }

        this.sequelize = new Sequelize({
            database: Configuration.database.database,
            dialect: Configuration.database.dialect,
            dialectModule: Configuration.database.dialect === "mysql" ? mysql2 : tedious, // Needed to fix sequelize issues with WebPack
            username: Configuration.database.user,
            password: Configuration.database.user,
            host: Configuration.database.host,

            dialectOptions: Configuration.database.dialect === "mssql" ? {
                instanceName: Configuration.database.schema,
            } : null,
        });

        this.dialect = Configuration.database.dialect;

        this.sequelize.addModels(Object.values(DbModels));
    }
}
