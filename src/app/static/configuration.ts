import deepAssign from "deep-assign";

const confFilePath = require.resolve("../../../json/restapi.json");
import fs = require("fs");

class ConfigurationHandler {

    public server: {
        host: string;
        protocol: "http" | "https";
        port: number,
        docs: boolean,
        logs: {
            dirname: string,
            date_pattern: string,
            max_files: string,
        },
        key_file?: string,
        cert_file?: string,
    };
    public database: {
        host: string;
        port: number;
        dialect: "mysql" | "mssql";
        schema?: string;

        database: string;
        user: string;
        pass: string;
        logging: boolean;
    };

    constructor() {
        this.init(confFilePath);
    }

    public init(configFilePath: string) {
        let data: ConfigurationHandler = {} as ConfigurationHandler;

        try {
            data = JSON.parse(fs.readFileSync(configFilePath, {encoding: "utf8"}));
        } catch (e) {

        }

        this.server = {
            host: "localhost",
            port: 8080,
            protocol: "http",
            docs: true,
            logs: {
                date_pattern: "YYYY-MM-DD",
                dirname: "logs",
                max_files: "14d",
            },
        };

        this.database = {
            host: "localhost",
            port: 3306,
            database: "database",
            user: "root",
            pass: "root",
            dialect: "mysql",
            logging: true,
        };

        deepAssign(this, data);
    }
}

const proxyHandler: ProxyHandler<ConfigurationHandler> = {
    get(target, name: string) {
        return target[name];
    },
};

const underlyingObj = new ConfigurationHandler();

export const Configuration = new Proxy<ConfigurationHandler>(underlyingObj, proxyHandler);
