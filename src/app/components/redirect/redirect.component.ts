import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  shortUrl: string  = "";
  loading = true;

  constructor(private route: ActivatedRoute,private dataService:DataService,private router:Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    this.shortUrl = <string>this.route.snapshot.paramMap.get('shortUrl') ;
    this.dataService.redirect(this.shortUrl);
  }

}
