import { Injectable } from '@angular/core';
import { Istd } from '../models/student.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  stdArr : Array<Istd> = [
    {
      fname : "Shriyansh",
      lname : "Nirgude",
      email : "shri@gmail.com",
      contact : "7020953215",
      stdId : "123"
    },
    {
      fname : "Pratik",
      lname : "Patil",
      email : "pratik@gmail.com",
      contact : "7020953216",
      stdId : "456"
    }
  ];
  stdSub$ : Subject<Istd> = new Subject<Istd>()
  
  constructor() { }
  
  fetchAllStudents(): Array<Istd>{
    return this.stdArr;
  }

  addStd(std: Istd){
    this.stdArr.unshift(std);
  }

  updateStd(updatedStd : Istd){
    let getIndex = this.stdArr.findIndex(std => std.stdId === updatedStd.stdId);
    this.stdArr[getIndex] = updatedStd;
  }

  removeStd(id : string){
    let getIndex = this.stdArr.findIndex(std => std.stdId === id);
    this.stdArr.splice(getIndex, 1);
  }
}
