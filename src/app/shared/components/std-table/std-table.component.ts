import { Component, OnInit } from '@angular/core';
import { Istd } from '../../models/student.interface';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss']
})
export class StdTableComponent implements OnInit {

  stdsInfo : Array<Istd> = [];
  constructor(
    private _stdService : StudentsService
  ) { }

  ngOnInit(): void {
    this.stdsInfo = this._stdService.fetchAllStudents()
  }

  onEdit(std : Istd){
    console.log(std);
    this._stdService.stdSub$.next(std);
  }

  onRemove(id : string){
    this._stdService.removeStd(id);
  }
}
