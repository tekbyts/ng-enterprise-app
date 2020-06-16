import { NgModule, ModuleWithProviders, APP_INITIALIZER } from "@angular/core";
import { SimpleConfigLoader } from './simple-cofig-loader.service';
import { SimpleConfigService } from './simple-config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


export const configInitializerFactory = ( 
    simpleConfigLoader:SimpleConfigLoader) => {
    const result = () => simpleConfigLoader.loadConfig()
    return result;
}

@NgModule({
    imports:[
        HttpClientModule
    ]
})
export class SimpleConfigModule{
    static forRoot():ModuleWithProviders<SimpleConfigModule>{
        return {
            ngModule:SimpleConfigModule,
            providers:[
                SimpleConfigService,
                SimpleConfigLoader,
                {
                    provide:APP_INITIALIZER,
                    multi:true,
                    useFactory:configInitializerFactory,
                    deps:[SimpleConfigLoader]
                }
            ]
        }
    }
}