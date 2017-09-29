import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http'
import { StateService } from './state.service'

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private baseURL: string = 'https://www.bungie.net/Platform'

  constructor(private state: StateService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders = this.state.token ? request.headers.set('X-API-Key', '26afb960ed334cc09268788c92305fd6').set('Authorization', 'Basic ' + this.state.token) : request.headers.set('X-API-Key', '26afb960ed334cc09268788c92305fd6')
    return next.handle(request.clone({url: this.baseURL + request.url}).clone({headers: headers}))
  }

}