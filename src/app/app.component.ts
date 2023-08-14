import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';
import { MainServiceService } from './@service/main-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'yewProject';
  BillData: any[] = [];

  constructor(
    private modalService: NgbModal,
    private _service: MainServiceService) { }

  ngOnInit(): void {
    this._service.Getdata().subscribe((data: any) => {
      this.BillData = data.Table;
    })
  }

  open(clickedData: number) {
    const modalRef = this.modalService.open(AddEditFormComponent, { fullscreen: true, scrollable: true });
    modalRef.result.then(
      (result) => {
          this.ngOnInit();
      }
    );
    this._service.rowId = clickedData;
  }
  edit(data: any) {
    const modalRef = this.modalService.open(AddEditFormComponent, { fullscreen: true, scrollable: true });
    modalRef.result.then(
      (result) => {
          this.ngOnInit();
      }
    );
    this._service.rowId = data.RowId;
  }
  delete(id: number) {
    const shouldDelete = window.confirm('Are you sure you want to delete the data?');
    if (shouldDelete) {
      this._service.deleteData(id).subscribe((data: any) => {
        this.ngOnInit();
      })
    }
  }

}
