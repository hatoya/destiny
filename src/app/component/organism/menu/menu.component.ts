import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'

interface Mode {
  id: number
  name: string
}
interface Clan {
  id: number
  name: string
}

@Component({
  selector: 'organism-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public modes: Mode[] = [
    {
      id: 39,
      name: 'Trials of the Nine'
    },
    {
      id: 1,
      name: 'Clash'
    },
    {
      id: 2,
      name: 'Control'
    },
    {
      id: 3,
      name: 'Supremacy'
    },
    {
      id: 4,
      name: 'Survival'
    },
    {
      id: 5,
      name: 'Countdown'
    },
    {
      id: 6,
      name: 'Iron Banner'
    }
  ]
  public clans: Clan[] = [
    {
      id: 2027026,
      name: '084Z'
    },
    {
      id: 2140164,
      name: 'BBJ'
    },
    {
      id: 2110598,
      name: 'Aaty'
    },
    {
      id: 1157243,
      name: 'A Knock'
    },
    {
      id: 1459862,
      name: 'Seventh Heaven'
    },
    {
      id: 655503,
      name: 'Valuser'
    },
    {
      id: 2857820,
      name: 'VioIet'
    },
    {
      id: 2732118,
      name: 'Ecla-R'
    },
    {
      id: 1800744,
      name: 'ALTEMEA'
    }
  ]

  constructor(public state: StateService) { }

  ngOnInit() {
  }

  changeMode(mode_id: number) {
    this.state.mode_id = mode_id
  }

}