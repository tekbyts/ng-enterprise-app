import { Injectable, Inject, forwardRef } from "@angular/core";
import { SimpleConfigService } from './simple-config.service';
import { HttpClient } from '@angular/common/http';
import { ITypedConfig } from '../config-while-startup/typed-config';

@Injectable()
export class SimpleConfigLoader{

    private configUrl:string = "assets/config/typed/typed-config.json";

    constructor( private httpClient: HttpClient,
    private config: SimpleConfigService){
        ;
    }

    loadConfig(configUrl?:string):Promise<any>{
        ///TODO request assets/config/typed/typed-config.json
        // const http = resolveForwardRef(this.httpClient);
        const url = configUrl === undefined ? this.configUrl : configUrl
        return this.httpClient
            .get(url)
            .toPromise()
            .then((data:ITypedConfig)=>{
                this.config.init(data);
            });
    }
}