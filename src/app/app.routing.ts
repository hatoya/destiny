import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { IndexComponent } from './component/page/index/index.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  }
]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes)