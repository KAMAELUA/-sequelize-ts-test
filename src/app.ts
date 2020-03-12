import {Injectable} from "@angular/core";
import express, {Express, NextFunction, Request, Response} from "express";
import fs from "fs";
import http from "http";
import https from "https";
import {DatabaseService} from "./app/services";
import {Configuration} from "./app/static/configuration";

@Injectable({
    providedIn: "root",
})
export class App {
    private httpApp: Express;

    constructor(
        private databaseService: DatabaseService,
    ) {
    }

    public async init() {
        this.httpApp = express();

        this.httpApp.use((req: Request, res: Response, next: NextFunction) => {
            res.send("hello");
        });

        const startListeningCb = () => {
            console.log(`Server started at ${Configuration.server.protocol}://${Configuration.server.host}:${Configuration.server.port}`);
        };

        if (Configuration.server.protocol === "http") {
            http.createServer(this.httpApp).listen(Configuration.server.port, Configuration.server.host, startListeningCb);
        } else if (Configuration.server.protocol === "https") {
            const options = {
                key: fs.readFileSync(Configuration.server.key_file),
                cert: fs.readFileSync(Configuration.server.cert_file),
            };
            https.createServer(options, this.httpApp).listen(Configuration.server.port, Configuration.server.host, startListeningCb);
        }
    }
}
