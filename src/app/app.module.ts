import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './containers/nav/nav.component';
import {HomeComponent} from './containers/home/home.component';
import {RedirectComponent} from './components/redirect/redirect.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginmodalComponent} from './components/loginmodal/loginmodal.component';
import {RegistermodalComponent} from './components/registermodal/registermodal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MyurlComponent} from './containers/myurl/myurl.component';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import { AddUrlComponent } from './components/add-url/add-url.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RedirectComponent,
    LoginmodalComponent,
    RegistermodalComponent,
    MyurlComponent,
    AddUrlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right'
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
