import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../service/auth.service";
import {LoginmodalComponent} from "../../components/loginmodal/loginmodal.component";
import {ToastrService} from "ngx-toastr";
import {RegistermodalComponent} from "../../components/registermodal/registermodal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private modalService: NgbModal,private router:Router,
              public authService: AuthService,private toastr: ToastrService) {

  }
  openLoginModal() {
    const modalRef = this.modalService.open(LoginmodalComponent);
    modalRef.result.then(value => {
      if(value){
       this.router.navigate(['/myUrl']);
      }
    });
  }
  openRegisterModal() {
    const modalRef = this.modalService.open(RegistermodalComponent);
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Disconected !');
  }
}
