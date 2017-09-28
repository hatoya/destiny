import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'

import { appRouting } from './app.routing'

// Component
import { AppComponent } from './app.component';
import { IndexComponent } from './component/page/index/index.component';
import { MenuComponent } from './component/organism/menu/menu.component';
import { HeadingComponent } from './component/atom/heading/heading.component'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    appRouting
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    HeadingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }