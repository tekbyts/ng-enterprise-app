import { Injectable } from '@angular/core';
import { ITypedConfig } from './typed-config';
import { stringify } from 'querystring';
import { IValidationResult } from 'src/app/utils/validation-result';

@Injectable(
    {providedIn:'root'}
)
export class StartupConfigService{
    
    typedConfig:ITypedConfig;
    keySeparator:string = ":";
    
    constructor(){
        ;
    }

    init(config:ITypedConfig){
        this.typedConfig = config;
    }

    get(path:string):string|any{

        const validationResult = this.validate(path);

        if(!validationResult.valid){
            console.log(validationResult.errors)
        }

        const keys = path.split(this.keySeparator);
        let result = keys.reduce((acc: any, current: string) => acc && acc[current], this.typedConfig);

        if (!result || result === undefined) {
            throw new Error(`No setting found with the specified key [${keys.join('/')}]!`);
        }

        return result;

    }

    private validate(path:string):IValidationResult<string>{
        const validationResult:IValidationResult<string>={
            valid:false,
            errors:[],
            model:path
        }
        // config should be loaded
        if(!this.typedConfig){
            validationResult.errors.push("config is not initialized with a value");
        }

        // trim leading and trailing spaces (if any)
        path = path.trim();

        // 1. if path has a value && 2. if path starts with ":"
        if(path && path.startsWith(this.keySeparator)){
            // remove leading ":"
            path = path.substring(1);
        }
        // 1. if path has a value && 2. if path ends with ":"
        if(path && path.endsWith(this.keySeparator)){
            // remove trailing ":"
            path = path.slice(0, -1);
        }
        // does path still has a value
        // path is empty?
        if(!path || path === undefined){
            ///TODO throw an error
            validationResult.errors.push("There is an issue with the key provided. Key is empty");
        }
        
        const keys = path.split(this.keySeparator);
        // 1. did path.split succeed? && keys is not null or undefined 
        // 2. && keys is not empty
        if(!keys || keys.length <= 0){
            ///TODO throw an error
            validationResult.errors.push("There is an issue with the key provided. Keys must be separated with a ':'");
        }

        validationResult.valid = !validationResult.errors.length
        return validationResult;

    }
}