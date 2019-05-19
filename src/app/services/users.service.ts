import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {filter, tap} from "rxjs/operators";
import {ApiService} from "./api.service";
import {orderBy} from 'lodash';
import {ActivatedRoute} from "@angular/router";

export interface User {
    id: number;
    userName: string;
    email: string;
    birthday: Date;
    phone: string;
}

export type FilterBy = 'id' | 'userName' | 'email' | 'phone' | 'birthday';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private users: User[];
    private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
    private urlSortingParams: FilterBy;

    constructor(private _api: ApiService,
                private route: ActivatedRoute) {
        this.initUsers();

        this.route.queryParams
            .pipe(filter(res => !!res['sort']))
            .subscribe(res => this.urlSortingParams = res['sort'])
    }

    private initUsers() {
        this._api.getUsers()
            .pipe(
                tap(res => this.users = res),
                tap(() => this.filterUsersBy(!!this.urlSortingParams ? this.urlSortingParams : 'email'))
            )
            .subscribe()
    }

    public addUser( user: User ): void {
        this.users.unshift(user);
        this.filterUsersBy(this.urlSortingParams);
    }

    public getUsers(): Observable<User[]> {
        return this.users$.asObservable().pipe(filter(res => !!res));
    }

    public filterUsersBy(type: FilterBy = 'email'): void {
        this.users$.next(orderBy(this.users, type, 'asc'));
        history.replaceState(null, '', `?sort=${type}`);
    }
}
