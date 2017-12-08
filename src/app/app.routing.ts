import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { IndexComponent } from './component/page/index/index.component'
import { PartyIndexComponent } from './component/page/party-index/party-index.component'
import { PartyDetailComponent } from './component/page/party-detail/party-detail.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'party',
    children: [
      {
        path: '',
        component: PartyIndexComponent
      },
      {
        path: ':id',
        component: PartyDetailComponent
      }
    ]
  }
]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes)