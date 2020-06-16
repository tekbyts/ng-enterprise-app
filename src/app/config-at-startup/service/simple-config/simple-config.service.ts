import { Injectable } from '@angular/core';
import { ITypedConfig } from '../config-while-startup/typed-config';

@Injectable(
    {
        providedIn:'root'
    }
)
export class SimpleConfigService{
    
    typedConfig:ITypedConfig;
    keySeparator:string = ":";
    
    constructor(){
        ;
    }

    init(config:ITypedConfig){
        this.typedConfig = config;
    }

    get(path:string):string|any{

        if(this.typedConfig === undefined){
            ///TODO throw an error
        }
        // path is empty?
        if(!path){
            ///TODO throw an error
        }
        if(!this.typedConfig){
            ///TODO throw an error
        }
        if(path.startsWith(this.keySeparator)){
            // remove leading ":"
            path = path.substring(1);
        } 
        if(path.endsWith(this.keySeparator)){
            // remove trailing ":"
            path = path.slice(0, -1);
        }
        if(!path){
            ///TODO throw an error
        }

        const keys = path.split(this.keySeparator);
        let result = keys.reduce((acc: any, current: string) => acc && acc[current], this.typedConfig);

        if (!result || result === undefined) {
            throw new Error(`No setting found with the specified key [${keys.join('/')}]!`);
        }

        return result;

    }
}