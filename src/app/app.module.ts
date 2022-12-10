import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameOfLife } from './game-of-life/game-of-life.component';

@NgModule({
  declarations: [
    AppComponent, 
    GameOfLife
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
