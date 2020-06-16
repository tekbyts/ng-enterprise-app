import { HttpClient } from '@angular/common/http';
import { StartupConfigService } from './config-at-startup/service/config-while-startup/startup-config.service';
import { ConfigLoader } from './config-at-startup/service/config-while-startup/config-loader';
import { HttpConfigLoader } from './config-at-startup/service/config-while-startup/http-config-loader';

export function httpConfigLoaderFac(http: HttpClient, typedConfigSvc:StartupConfigService): ConfigLoader {
    return new HttpConfigLoader(http, typedConfigSvc, 'assets/config/typed/typed-config.json');
  }