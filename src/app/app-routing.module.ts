import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./containers/home/home.component";
import {RedirectComponent} from "./components/redirect/redirect.component";
import {MyurlComponent} from "./containers/myurl/myurl.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [

  {
    path: '',
    redirectTo:'/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'myUrl',
    canActivate:[AuthGuard],
    component: MyurlComponent,
    pathMatch: 'full'
  },
  {
    path: ':shortUrl',
    component: RedirectComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
