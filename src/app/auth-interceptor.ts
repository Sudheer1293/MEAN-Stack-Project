import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AppService } from './app.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private appService: AppService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.appService.getToken();
        console.log(token)
        const authReq = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + token)
        });
        console.log(authReq)
        return next.handle(authReq);
    }
}