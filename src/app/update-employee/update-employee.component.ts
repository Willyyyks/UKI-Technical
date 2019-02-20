import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  data: object = {};
  employees = [];
  exist = false;
  employeeObj: object = {};
  private headers = new Headers({ 'Content-Type': 'application/json'});

  constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }

  updateEmployee(employee) {
    this.employeeObj = {
      name: employee.name,
      department: employee.department
    };
    const url = `${'http://localhost:3000/employees'}/${this.id}`;
    this.http.put(url, JSON.stringify(this.employeeObj), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    this.http.get('http://localhost:3000/employees').subscribe(
      (res: Response) => {
        this.employees = res.json();
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.employees.length ; i++) {
          // tslint:disable-next-line:radix
          if (parseInt(this.employees[i].id) === this.id) {
            this.exist = true;
            this.data = this.employees[i];
            break;
          } else {
            this.exist = false;
          }
        }
      }
    );
  }

}
