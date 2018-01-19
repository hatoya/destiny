import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { IndexComponent } from './component/page/index/index.component'
import { ClanDetailComponent } from './component/page/clan-detail/clan-detail.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'clan',
    children: [
      {
        path: ':id',
        component: ClanDetailComponent
      }
    ]
  }
]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes)