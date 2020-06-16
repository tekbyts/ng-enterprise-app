import { Injectable } from "@angular/core";

export abstract class ConfigLoader{
    abstract loadConfig():any;
}