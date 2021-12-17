import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
    selector: 'app-employee-dashboard',
    templateUrl: './employee-dashboard.component.html',
    styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

    formValue !: FormGroup;
    employeeModelObject: EmployeeModel = new EmployeeModel();
    employeeData: any;
    edit: boolean = false;
    constructor(private formBuilder: FormBuilder, private api: ApiService) { }

    ngOnInit(): void {
        this.formValue = this.formBuilder.group({
            firstName: [''],
            lastName: [''],
            email: [''],
            mobile: [''],
            salary: ['']
        })

        this.getAllEmployee();
    }

    addEmployee() {
        this.formValue.reset();
        this.edit = false;
    }

    postEmployeeDetails() {
        this.employeeModelObject.firstName = this.formValue.value.firstName;
        this.employeeModelObject.lastName = this.formValue.value.lastName;
        this.employeeModelObject.email = this.formValue.value.email;
        this.employeeModelObject.mobile = this.formValue.value.mobile;
        this.employeeModelObject.salary = this.formValue.value.salary;

        this.api.postEmployee(this.employeeModelObject)
            .subscribe(res => {
                this.formValue.reset();
                let ref = document.getElementById('cancel');
                ref?.click();
                this.getAllEmployee();
            }, err => {
                alert('something went wrong');
            })
    }

    getAllEmployee() {
        this.api.getEmployee()
            .subscribe(res => {
                this.employeeData = res;
            },
                err => {
                    alert('something went wrong');
                })
    }

    editEmployeeDetails(employee: any) {
        this.edit = true;
        console.log('edit id : ', employee.id);
        this.employeeModelObject.id = employee.id;
        this.formValue.controls['firstName'].setValue(employee.firstName);
        this.formValue.controls['lastName'].setValue(employee.lastName);
        this.formValue.controls['email'].setValue(employee.email);
        this.formValue.controls['mobile'].setValue(employee.mobile);
        this.formValue.controls['salary'].setValue(employee.salary);
    }

    updateEmployeeDetails() {
        this.employeeModelObject.firstName = this.formValue.value.firstName;
        this.employeeModelObject.lastName = this.formValue.value.lastName;
        this.employeeModelObject.email = this.formValue.value.email;
        this.employeeModelObject.mobile = this.formValue.value.mobile;
        this.employeeModelObject.salary = this.formValue.value.salary;

        this.api.updateEmployee(this.employeeModelObject, this.employeeModelObject.id)
            .subscribe(res => {
                this.formValue.reset();
                let ref = document.getElementById('cancel');
                ref?.click();
                this.getAllEmployee();
            },
                err => {
                    console.log('something went wrong');
                })
    }

    deleteEmployeeDetails(id: number) {
        this.api.deleteEmployee(id)
            .subscribe(res => {
                this.getAllEmployee();
            },
                err => {
                    console.log('something went wrong');
                })
    }

}
