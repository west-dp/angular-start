import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FilterBy, User, UsersService} from "../../services/users.service";

// asc desc

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.styl']
})
export class UsersComponent implements OnInit {

    public users: User[] = [];

    constructor(private _api: ApiService,
                private _users: UsersService) {
    }

    filterUser(type: FilterBy): void {
        this._users.filterUsersBy(type);
    }

    ngOnInit(): void {
        this._users.getUsers()
            .subscribe(res => this.users = res);
    }

}
