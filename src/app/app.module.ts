import 'rxjs/Rx'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { DatePipe } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ServiceWorkerModule } from '@angular/service-worker'

import { environment } from '../environments/environment';

// AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

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
import { HeaderComponent } from './component/organism/header/header.component';
import { PartyIndexComponent } from './component/page/party-index/party-index.component';
import { GgComponent } from './component/atom/gg/gg.component';
import { TrackerComponent } from './component/atom/tracker/tracker.component';
import { DiffComponent } from './component/atom/diff/diff.component';
import { ErrorComponent } from './component/atom/error/error.component';
import { PartyDetailComponent } from './component/page/party-detail/party-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    HeadingComponent,
    CharacterComponent,
    LoadComponent,
    HeaderComponent,
    PartyIndexComponent,
    GgComponent,
    TrackerComponent,
    DiffComponent,
    ErrorComponent,
    PartyDetailComponent
  ],
  providers: [
    DatePipe,
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