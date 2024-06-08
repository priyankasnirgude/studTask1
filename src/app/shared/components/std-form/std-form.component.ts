import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from '../../const/validationPattern';
import { Istd } from '../../models/student.interface';
import { UuidService } from '../../services/uuid.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {

  stdForm !: FormGroup;
  stdEditObj !: Istd;
  isInEditmode : boolean = false;

  private _uuidService = inject(UuidService);
  private _stdService = inject(StudentsService);

  constructor() { }

  ngOnInit(): void {
    this.createStdForm();
    this._stdService.stdSub$
    .subscribe(res => {
      if(res){
        this.stdEditObj = res;
        this.isInEditmode = true;
        this.stdForm.patchValue(res);
      }
    })
  }


  createStdForm(){
    this.stdForm = new FormGroup({
      fname : new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.onlyText)
      ]),
      lname : new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.onlyText)
      ]),
      email : new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.email)
      ]),
      contact : new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
    })
  }

  onStdAdd(){
    if(this.stdForm.valid){
      let stdObj : Istd = {...this.stdForm.value, stdId : this._uuidService.generateUuid()};
      console.log(stdObj);
      this._stdService.addStd(stdObj)
      this.stdForm.reset()
    }
  }

  onUpdate(){
    if(this.stdForm.valid){
      let updatedObj : Istd = {...this.stdForm.value, stdId :this.stdEditObj.stdId};
      this._stdService.updateStd(updatedObj)
      this.stdForm.reset();
      this.isInEditmode = false
    }
  }
}
