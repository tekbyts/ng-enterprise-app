import { Component } from '@angular/core';
import { StartupConfigService } from './config-at-startup/service/config-while-startup/startup-config.service';
import { SimpleConfigService } from './config-at-startup/service/simple-config/simple-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _configValue:string;
  // constructor(private configSvc:SimpleConfigService){
    constructor(private configSvc:StartupConfigService){
    this._configValue = configSvc.get("appInsights:instrumentationKey");
  }

  get configValue(){
    return this._configValue;
  }
}
