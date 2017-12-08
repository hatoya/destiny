import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { AngularFirestore } from 'angularfire2/firestore'
import { StorageService } from './storage.service'
import { Player } from '../model/player.model'

@Injectable()
export class ApiService {

  private destiny_id: string = ''

  constructor(private http: HttpClient, private fireStore: AngularFirestore, private storage: StorageService) {
    // this.destiny_id = this.storage.get('bungie_oauth')['destiny_id']
  }

  getToken(code: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic MjE2ODY6VE9qTDhJM1BCQk5nYW5aVnBuMmFqQmtxV0l5NDRWbjdEcGhRQVZISnBXYw=='})
    return this.http.post('/app/oauth/token/', 'grant_type=authorization_code&code=' + code, {headers: headers})
  }

  getUser() {
    return this.http.get('/User/GetMembershipsById/' + this.destiny_id + '/-1/')
  }

  getProfile(): Observable<any> {
    const params = new HttpParams().set('components', '100')
    return this.http.get('/Destiny2/2/Profile/' + this.destiny_id + '/', {params: params})
  }

  getCharacters(): Observable<any> {
    const params = new HttpParams().set('components', '200,205')
    return this.http.get('/Destiny2/2/Profile/' + this.destiny_id + '/', {params: params})
  }

  getCharacter(character_id: string) {
    const params = new HttpParams().set('components', '200,205')
    return this.http.get('/Destiny2/2/Profile/' + this.storage.get('bungie_oauth')['destiny_id'] + '/Character/' + character_id + '/', {params: params})
  }

  // 1851423
  getClan(clan_id: string) {
    return this.http.get('/GroupV2/' + clan_id + '/')
  }

  // 1851423
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

  getPlayer(id: string): Observable<Player> {
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

  getVendors(character_id: string) {
    const params = new HttpParams().set('components', '400')
    return this.http.get('/Destiny2/2/Profile/' + this.destiny_id + '/Character/' + character_id + '/Vendors/', {params: params})
  }

  getStats() {
    return this.http.get('/Destiny2/Stats/Definition/')
  }

  getMilestones() {
    return this.http.get('/Destiny2/Milestones/')
  }

  getTracker(id: string): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/2/' + id).map(content => Object.keys(content).map(value => content[value]).filter(stat => stat['mode'] === 39))
  }

  getFireUsers(): Observable<any> {
    return this.fireStore.collection('user').valueChanges()
  }

  setFireUsers(member: Player) {
    this.fireStore.collection('user').doc(member.name).set(Object.assign({}, member))
  }

  getFireParties() {
    return this.fireStore.collection('party').valueChanges()
  }

}