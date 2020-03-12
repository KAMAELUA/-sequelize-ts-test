import {Provider} from "@angular/core";
import {App} from "./src/app";
import {
    DatabaseService,
} from "./src/app/services";

export const providers: Provider[] = [
    App,
    DatabaseService,
];
