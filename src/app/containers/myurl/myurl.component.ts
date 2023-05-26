import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UrlDto} from "../../model/url-dto";
import {DataService} from "../../service/data.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddUrlComponent} from "../../components/add-url/add-url.component";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject, Observable, of} from "rxjs";

@Component({
  selector: 'app-myurl',
  templateUrl: './myurl.component.html',
  styleUrls: ['./myurl.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MyurlComponent implements OnInit {
  public urls: Array<UrlDto> = [];

  constructor(private dataService: DataService, private modalService: NgbModal, private toastr: ToastrService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadData();
  }

  addRow() {
    const modalRef = this.modalService.open(AddUrlComponent);
    modalRef.result.then(value => {
      console.log(value);
      this.urls.push(value);
      this.changeDetectorRef.detectChanges();
    });

  }

  deleteRow(url: UrlDto, i: number) {
    this.dataService.deleteUrl(url).subscribe(value => this.toastr.success("Url deleted !"));
    this.urls.splice(i, 1);
    this.changeDetectorRef.detectChanges();
  }

  loadData(): void {
    this.dataService.getUrls().subscribe(value => {
      this.urls= value;
      this.urls = [...this.urls]
      this.changeDetectorRef.detectChanges();
    });

  }

  handleCheckboxChange(url: UrlDto, checkbox: any) {
    if (checkbox.checked) {
      this.dataService.enableUrl(url).subscribe(value => this.toastr.success("Url enabled !"));
    } else {
      this.dataService.disableUrl(url).subscribe(value => this.toastr.success("Url disabled !"));
    }

  }

  public trackByShortUrl (index: number, url: UrlDto) {
    return url.shortenedUrl;
  }

}
