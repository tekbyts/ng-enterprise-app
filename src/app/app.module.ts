import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigAtStartupComponent } from './config-at-startup/component/config-at-startup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StartupConfigService } from './config-at-startup/service/config-while-startup/startup-config.service';
import { ConfigLoader } from './config-at-startup/service/config-while-startup/config-loader';
import { StartupConfigModule } from './config-at-startup/service/config-while-startup/startup-config.module';
import { SimpleConfigModule } from './config-at-startup/service/simple-config/simple-config.module';
import { httpConfigLoaderFac } from './http-config-loader-factory';

@NgModule({
  declarations: [
    AppComponent,
    ConfigAtStartupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    StartupConfigModule.forRoot(
      {
        provide: ConfigLoader,
        useFactory: httpConfigLoaderFac,
        deps: [HttpClient, StartupConfigService]
      }
    )
    // SimpleConfigModule.forRoot()
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
