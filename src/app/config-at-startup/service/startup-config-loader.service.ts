import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class StartupConfigLoader {

  constructor(private http: HttpClient,
    private appConfig:AppConfigService) {
    ;
  }

  loadAppConfig() {
    return this.http
      .get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  getServerUrl(): string {
    return this.appConfig.API_URL;
  }

}
