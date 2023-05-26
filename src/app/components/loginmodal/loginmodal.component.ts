import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginDto} from "../../model/login-dto";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, of} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css']
})
export class LoginmodalComponent {
  loginDto: LoginDto = new LoginDto();

  submitted = false;
  unauthorized = false;

  loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }
  );
  errorMsg: String = "";

  constructor(public activeModal: NgbActiveModal, private authService: AuthService,private toastr: ToastrService) {

  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginDto.username = this.loginForm.controls.username.value;
    this.loginDto.password = this.loginForm.controls.password.value;
    this.authService.login(this.loginDto).pipe(catchError(this.handleError<string>())).subscribe((value) => {
      if(!this.unauthorized){
        this.toastr.success('Connected !!');
        this.activeModal.close(true);
      }

    })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.unauthorized = true;
      this.errorMsg = error.error.detail;
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
