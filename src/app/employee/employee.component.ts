import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http: Http) { }
  confirmationString = 'New employee has been added';
  isAdded = false;
  employeeObj: object = {};

  addNewEmployee = function(employee) {
    this.employeeObj = {
      id: employee.id,
      name: employee.name,
      department: employee.department
    };
    this.http.post('http://localhost:3000/employees/', this.employeeObj).subscribe((res: Response) => {
    this.isAdded = true;
    });
  };

  ngOnInit() {
  }

}
