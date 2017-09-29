import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http'

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private baseURL: string = 'https://www.bungie.net/Platform'
  private token: string = 'CO8iEoYCACBzZ+i2BlG/ZgoCvdV0v0sdoyYaSMJRYo9v9yB/Q4rTW+AAAAD86Yc+Bsr81OM/kHY+uhiRQr1a9RY+7B+3aWQF3Gvkx5gpFQi/7YRsmzDSRFFiBr24ZXdyD+WXjNfx2+moSNFWtvIFYflXYC45PzDI1slCmTCvcbhct+h1XnJCDQtVeGe1/NZgZvTQu5+nk3bagzwh5K44kc8HATCVw+Yqc4dK/LVWwcl0gF7/Rexn1Ys9LGrplAIsx4iu/CpGICzV3zGFehHHgg9FDnIh8RaVyKYaShh3nqYKkLIzWGyMSd5Y80RvHuhtf9wuXTl0rsOeTat+N6BzhfA1JV3ZnBD4yDwbtA=='

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone({url: this.baseURL + request.url}).clone({headers: request.headers.set('X-API-Key', '26afb960ed334cc09268788c92305fd6').set('Authorization', 'Bearer ' + this.token)}))
  }

}