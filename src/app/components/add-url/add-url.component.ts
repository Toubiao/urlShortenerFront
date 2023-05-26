import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddUrlComponent {

  submitted = false;
  unauthorized = false;

  urlForm = new FormGroup({
      url: new FormControl('', [Validators.required,Validators.pattern('^(http(s)?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,7}(\\/[\\w.-]+)*\\/?(\\?[\\w-]+=[\\w.-]+(&[\\w-]+=[\\w.-]+)*)?$')])
    }
  );
  errorMsg: String = "";


  constructor(public activeModal: NgbActiveModal, private dataService: DataService,private toastr: ToastrService) {

  }
  get f(): { [key: string]: AbstractControl } {
    return this.urlForm.controls;
  }

  addUrl() {
    this.submitted = true;


    if (this.urlForm.invalid) {
      return;
    }

    const url = this.urlForm.value.url;

    this.dataService.createUrl(<String>url).subscribe(value => {
      console.log("test");
      this.toastr.success('Successfully added an url');
      this.urlForm.reset();
      this.submitted = false;
      this.activeModal.close(value);
    });

  }

}
