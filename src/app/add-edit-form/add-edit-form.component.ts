import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MainServiceService } from '../@service/main-service.service';

@Component({
  selector: 'app-add-edit-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss'],
  preserveWhitespaces: true
})
export class AddEditFormComponent implements OnInit {

  addEditForm: FormGroup;
  isSubmitClicked: boolean = false;
  rowID: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _service: MainServiceService) { 

      this.addEditForm = this.fb.group({
        RowId: [''],
        ActionId: [0],
        Code: ['', Validators.required],
        Name: ['', Validators.required],
        Address: [''],
        Country: [''],
        State: [''],
        City: [''],
        Mobile: ['', [this.mobileNumberValidator()]],
        Email: ['',[Validators.email]],
        GSTNo: [''],
        PANNo: [''],
        PinCode: [''],
        Latitude: [''],
        Longitude: [''],
        ContactPersonDetails: this.fb.array([],Validators.minLength(2)),
      });
    }

  ngOnInit(): void {
    this.rowID = this._service.rowId;
    if(this.rowID !== 0) {
      this.addEditForm.get('RowId')?.setValue(this._service.rowId);
      this._service.getById(this.rowID).subscribe((data: any) => {
        
        this.addEditForm.get('Code')?.setValue(data.Table[0].Code);
        this.addEditForm.get('Name')?.setValue(data.Table[0].Name);
        this.addEditForm.get('Address')?.setValue(data.Table[0].Address);
        this.addEditForm.get('Country')?.setValue(data.Table[0].Country);
        this.addEditForm.get('State')?.setValue(data.Table[0].State);
        this.addEditForm.get('City')?.setValue(data.Table[0].City);
        this.addEditForm.get('Mobile')?.setValue(data.Table[0].Phone);
        this.addEditForm.get('Email')?.setValue(data.Table[0].Email);
        this.addEditForm.get('GSTNo')?.setValue(data.Table[0].GSTNo);
        this.addEditForm.get('PANNo')?.setValue(data.Table[0].PANNo);
        this.addEditForm.get('PinCode')?.setValue(data.Table[0].PinCode);
        this.addEditForm.get('Latitude')?.setValue(data.Table[0].Latitude);
        this.addEditForm.get('Longitude')?.setValue(data.Table[0].Longitude);

        for(let i = 0; i < data.Table1.length; i++) {
          this.addContactPerson(data.Table1[i]);
        }
      })
    } else {
      this.addContactPerson(null);
    }
  }

  createContactPerson(data: any): FormGroup {
    return this.fb.group({
      RowId: [data?.RowId],
      PersonName: [data?.Name, Validators.required],
      PersonMobile: [data?.['Mobile No'], [Validators.required, this.mobileNumberValidator()]],
      PersonEmail: [data?.Email, Validators.email],
      Department: [data?.Department, Validators.required],
      Designation: [data?.Designation, Validators.required],
    })
  }

  get contactPerson(): FormArray {
    return <FormArray>this.addEditForm.get('ContactPersonDetails');
  }

  addContactPerson(data: any) {
    this.contactPerson.push(this.createContactPerson(data));
  }

  remove(index: number) {
    this.contactPerson.removeAt(index);
  }

  mobileNumberValidator(): ValidatorFn {
    const pattern = /^\d{10}$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!pattern.test(value)) {
        return { invalidMobile: true };
      }
      return null;
    };
  }

  onSubmit() {
    this.isSubmitClicked = true
    if(this.addEditForm.valid) {
      this._service.saveData(this.addEditForm.value).subscribe((data: any) => {
        this.activeModal.close('Close click');
      })
    } 
  }
}
