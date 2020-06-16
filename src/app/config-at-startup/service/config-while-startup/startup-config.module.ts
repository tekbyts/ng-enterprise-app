import { NgModule, ModuleWithProviders, APP_INITIALIZER, Provider } from "@angular/core";
import { ConfigLoader } from './config-loader';
import { StartupConfigService } from './startup-config.service';

export const configInitializerFactory = (configLoader:ConfigLoader) => {
    const result = () => configLoader.loadConfig();
    return result;
}


@NgModule({
})
export class StartupConfigModule{
    static forRoot(configLoader:Provider)
        :ModuleWithProviders<StartupConfigModule>{
        return {
            ngModule:StartupConfigModule,
            providers:[
                configLoader,
                {
                    provide: APP_INITIALIZER,
                    useFactory:configInitializerFactory,
                    deps:[
                        ConfigLoader
                    ],
                    multi:true
                }
            ]
        }
    }
}