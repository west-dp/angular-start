import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.styl']
})
export class NewUserComponent implements OnInit {

    public form: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                private _users: UsersService,
                private _api: ApiService) {
    }

    public initForm(): void {
        this.form = this.fb.group({
            id: [null],
            userName: [null, [
                Validators.required,
                Validators.minLength
            ]],
            email: [null, [
                Validators.required,
                Validators.email
            ]],
            birthday: [null, [Validators.required]],
            phone: [null, [
                Validators.required,
                Validators.pattern(/[0-9]/)
            ]]
        })
    }

    public create(): void {
        this._api.createUser(this.form.value).subscribe(res => {
            this.router.navigate(['/']);
            this._users.addUser(res);
        });
    }

    ngOnInit(): void {
        this.initForm();
    }

}
