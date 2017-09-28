import 'rxjs/Rx'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

// Routing
import { appRouting } from './app.routing'

// Service
import { ApiService } from './service/api.service'

// Component
import { AppComponent } from './app.component';
import { IndexComponent } from './component/page/index/index.component';
import { MenuComponent } from './component/organism/menu/menu.component';
import { HeadingComponent } from './component/atom/heading/heading.component'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    appRouting
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    HeadingComponent
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }