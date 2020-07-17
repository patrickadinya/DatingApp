import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';

@Injectable()

export class MemberListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private userServices: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userServices.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retireving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

}

