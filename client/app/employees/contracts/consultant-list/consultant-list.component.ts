import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../core/services/employee.service";
import {Employee} from "../../../core/models/employee.interface";

@Component({
  selector: 'consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.scss']
})
export class ConsultantListComponent implements OnInit {

  employeeList: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.list().then(employees => {
      this.employeeList = employees;
    });
  }
}
