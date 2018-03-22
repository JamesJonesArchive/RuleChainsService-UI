import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { ChainComponent } from './chain/chain.component';
import { RulesetComponent } from './ruleset/ruleset.component';


@NgModule({
  declarations: [
    AppComponent,
    ChainComponent,
    RulesetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
