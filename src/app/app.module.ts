import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaunchProgramsComponent } from './components/launch-programs/launch-programs.component';
import { ProgramsService } from './services/programs.service';

@NgModule({
  declarations: [
    AppComponent,
    LaunchProgramsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProgramsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
