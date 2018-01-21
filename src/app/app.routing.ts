import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { IndexComponent } from './component/page/index/index.component'
import { ClanIndexComponent } from './component/page/clan-index/clan-index.component'

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
        component: ClanIndexComponent
      }
    ]
  }
]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes)