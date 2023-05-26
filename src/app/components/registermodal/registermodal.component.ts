import {Component, OnInit} from '@angular/core';
import {RegisterDto} from "../../model/register-dto";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../service/data.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {catchError, Observable, of} from "rxjs";


function mustMatch(password: string, confirmPassword: string): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(password);
    const checkControl = controls.get(confirmPassword);

    if (checkControl?.errors && !checkControl.errors['matching']) {
      return null;
    }

    if (control?.value !== checkControl?.value) {
      controls.get(confirmPassword)?.setErrors({matching: true});
      return {matching: true};
    } else {
      return null;
    }
  };
}
@Component({
  selector: 'app-registermodal',
  templateUrl: './registermodal.component.html',
  styleUrls: ['./registermodal.component.css']
})
export class RegistermodalComponent implements OnInit{
  userToRegister: RegisterDto = new RegisterDto();
  submitted = false;

  unauthorized = false;


  registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: [mustMatch('password', 'confirmPassword')]
    }
  );

  constructor(public activeModal: NgbActiveModal,private dataService: DataService,private route: ActivatedRoute,private toastr: ToastrService) {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  ngOnInit() {
    this.userToRegister = new RegisterDto();
  }


  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.userToRegister.username = this.registerForm.controls.username.value;
    this.userToRegister.password = this.registerForm.controls.password.value;

    this.dataService.signup(this.userToRegister).pipe(catchError(this.handleError<string>())).subscribe(value => {
      this.registerForm.reset();
      this.submitted = false;
      this.toastr.success('Vous vous êtes enregistré avec succès, vous allez recevoir un email pour confirmer votre inscription.','',{timeOut:10000});
    })
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.unauthorized = true;
      //this.errorMsg = error.error.detail;
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
