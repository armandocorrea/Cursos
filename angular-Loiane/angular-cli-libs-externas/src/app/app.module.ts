import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { MaterializeModule } from 'materialize-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiretivaNgforComponent } from './diretiva-ngfor/diretiva-ngfor.component';

@NgModule({
  declarations: [
    AppComponent,
    DiretivaNgforComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
