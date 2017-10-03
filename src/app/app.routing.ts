import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { IndexComponent } from './component/page/index/index.component'
import { CharacterIndexComponent } from './component/page/character-index/character-index.component'
import { CharacterDetailComponent } from './component/page/character-detail/character-detail.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'character',
    children: [
      {
        path: '',
        component: CharacterIndexComponent
      },
      {
        path: ':id',
        component: CharacterDetailComponent
      }
    ]
  }
]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes)