import {ReflectiveInjector} from "@angular/core";
import "reflect-metadata";
import {providers} from "./providers";
import {App} from "./src/app";

function launch() {
        const injector = ReflectiveInjector.resolveAndCreate(providers);
        const app = injector.get(App) as App;
        app.init().then();
}

launch();
