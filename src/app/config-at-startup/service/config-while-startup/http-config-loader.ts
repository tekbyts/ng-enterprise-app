import { ConfigLoader } from './config-loader';
import { Inject, forwardRef, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StartupConfigService } from './startup-config.service';
import { ITypedConfig } from './typed-config';

export class HttpConfigLoader implements ConfigLoader{
    constructor(
        @Inject(HttpClient) private readonly http: HttpClient,
        @Inject(StartupConfigService) private readonly configSvc: StartupConfigService,
        private readonly configUrl:string,
    ){
        if(this.configUrl === undefined){
            ///TODO throw an error that config url should be supplied
        }
    }
    
    loadConfig():Promise<any>{
        ///TODO request assets/config/typed/typed-config.json
        // const http = resolveForwardRef(this.http);
        // const config = resolveForwardRef(this.configSvc);
        
        return this.http
            .get(this.configUrl)
            .toPromise()
            .then((data:ITypedConfig)=>{
                this.configSvc.init(data);
            });
    }
}