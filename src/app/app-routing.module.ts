import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from "./components/users/users.component";
import {NewUserComponent} from "./components/new-user/new-user.component";

const routes: Routes = [
    {path: 'create', component: NewUserComponent},
    {path: '**', component: UsersComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
