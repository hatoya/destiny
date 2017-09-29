import 'rxjs/Rx'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

// Routing
import { appRouting } from './app.routing'

// Service
import { StateService } from './service/state.service'
import { ApiService } from './service/api.service'
import { InterceptorService } from './service/interceptor.service'

// Component
import { AppComponent } from './app.component';
import { IndexComponent } from './component/page/index/index.component';
import { MenuComponent } from './component/organism/menu/menu.component';
import { HeadingComponent } from './component/atom/heading/heading.component';
import { CharacterIndexComponent } from './component/page/character-index/character-index.component'

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
    HeadingComponent,
    CharacterIndexComponent
  ],
  providers: [
    StateService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }