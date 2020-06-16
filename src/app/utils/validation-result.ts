export interface IValidationResult<T>{
    valid:boolean;
    errors:Array<string>;
    model:T
}