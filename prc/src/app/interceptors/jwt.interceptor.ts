import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const token = this.userService.tokenValue;

    // const isLoggedIn = tokenObj && tokenObj.token;
    const isLoggedIn = true;
    //const isApiUrl = request.url.startsWith('http:://localhost:3000');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    // return next.handle(request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log("event--->>>", event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        //  console.error(error);
        return throwError(error);
      })
    );
  }
}
