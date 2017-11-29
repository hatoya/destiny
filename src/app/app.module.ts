import 'rxjs/Rx'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ServiceWorkerModule } from '@angular/service-worker'

import { environment } from '../environments/environment';

// AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Routing
import { appRouting } from './app.routing'

// Service
import { StateService } from './service/state.service'
import { ApiService } from './service/api.service'
import { StorageService } from './service/storage.service'
import { InterceptorService } from './service/interceptor.service'

// Component
import { AppComponent } from './app.component';
import { IndexComponent } from './component/page/index/index.component';
import { MenuComponent } from './component/organism/menu/menu.component';
import { HeadingComponent } from './component/atom/heading/heading.component';
import { CharacterComponent } from './component/organism/character/character.component';
import { LoadComponent } from './component/organism/load/load.component';
import { TableOrderPipe } from './pipe/table-order.pipe';
import { HeaderComponent } from './component/organism/header/header.component';
import { PartyIndexComponent } from './component/page/party-index/party-index.component';
import { GgComponent } from './component/atom/gg/gg.component';
import { TrackerComponent } from './component/atom/tracker/tracker.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    appRouting,
    ServiceWorkerModule.register('/ngsw-worker.js'),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    HeadingComponent,
    CharacterComponent,
    LoadComponent,
    TableOrderPipe,
    HeaderComponent,
    PartyIndexComponent,
    GgComponent,
    TrackerComponent
  ],
  providers: [
    StateService,
    StorageService,
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