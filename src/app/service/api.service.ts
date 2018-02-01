import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { DatePipe } from '@angular/common'
import { AngularFirestore } from 'angularfire2/firestore'
import { StorageService } from './storage.service'
import { Player } from '../model/player.model'

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private datePipe: DatePipe, private fireStore: AngularFirestore, private storage: StorageService) { }

  postClanSearch(target: string): Observable<any> {
    return this.http.post('/GroupV2/Search/', { name: target, groupType: 1, creationDate: 0, sortBy: 0, localeFilter: '', tagText: '', itemsPerPage: 1, currentPage: 1, requestContinuationToken: 0 })
  }

  getClan(clan_id: string): Observable<any> {
    return this.http.get('/GroupV2/' + clan_id + '/')
  }

  getClanMembers(clan_id: string): Observable<Player> {
    return this.http.get('https://api.guardian.gg/v2/clan/' + clan_id + '/members?lc=ja').map(content => Object.keys(content).map(value => content[value])).flatMap(member => member).map(content => {
      let player: Player = new Player(content['member']['destinyUserInfo']['membershipId'], content['member']['destinyUserInfo']['displayName'])
      let nine: any = content['stats'][39]
      player.elo_gg = nine ? nine['elo'] : 0
      player.kd = nine ? nine['kills'] / nine['deaths'] : 0
      player.kda = nine ? (nine['kills'] + (nine['assists'] / 2)) / nine['deaths'] : 0
      player.kad = nine ? (nine['kills'] + nine['assists']) / nine['deaths'] : 0
      player.match = nine ? nine['gamesPlayed'] : 0
      return player
    })
  }

  getGg(id: string): Observable<Player> {
    return this.http.get('https://api.guardian.gg/v2/players/' + id + '?lc=ja').map(content => {
      let player: Player = new Player(content['player']['membershipId'], content['player']['name'])
      let nine: any = content['player']['stats'].filter(stat => stat['mode'] === 39)[0]
      player.elo_gg = nine['elo']
      player.kd = nine['kills'] / nine['deaths']
      player.kda = (nine['kills'] + (nine['assists'] / 2)) / nine['deaths']
      player.kad = (nine['kills'] + nine['assists']) / nine['deaths']
      player.rank_gg = content['playerRanks'][39]
      player.match = nine['gamesPlayed']
      return player
    })
  }

  getGgHistory(id: string, start: Date, end: Date): Observable<any> {
    return this.http.get('https://api.guardian.gg/v2/players/' + id + '/performance/0/' + this.datePipe.transform(start, 'yyyy-MM-dd') + '/' + this.datePipe.transform(end, 'yyyy-MM-dd') + '?lc=ja')
  }

  getTrackerHistory(id: string): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/history/2/' + id + '/39/')
  }

  getTracker(id: string): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/2/' + id + '?season=2').map(content => Object.keys(content).map(value => content[value]).filter(stat => stat['mode'] === 39))
  }

}