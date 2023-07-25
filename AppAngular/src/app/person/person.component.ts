import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from '../person-model';
import { PersonService } from '../person.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {

  form: any;
  formTitle: string | undefined;
  people: Person[] | undefined;
  personName: string | undefined;
  personId: number | undefined;
  tableVisibility: boolean = true;
  formVisibility: boolean = false;
  modalRef: BsModalRef | undefined;

  constructor(
    private personService: PersonService,
    private modalService: BsModalService) {}

  ngOnInit(): void{

    this.personService.List().subscribe(result =>
      this.people = result);

    this.formTitle = 'New person'
    this.form = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null),
      age: new FormControl(null),
      occupation: new FormControl(null)
    });
  }

  ShowSignInForm(): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.formTitle = 'New person'
    this.form = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null),
      age: new FormControl(null),
      occupation: new FormControl(null)
    });
  }

  ShowEditForm(personId: any): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.personService.GetById(personId).subscribe(result => {
      this.formTitle = `Edit ${result.name} ${result.lastName}`;

        this.form = new FormGroup({
        id: new FormControl(result.id),
        name: new FormControl(result.name),
        lastName: new FormControl(result.lastName),
        age: new FormControl(result.age),
        occupation: new FormControl(result.occupation)
      });
    });
  }

  ShowDeleteConfirmation(id: any, name: string | undefined, modalContent: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modalContent);
    this.personId = id;
    this.personName = name;
  }

  Delete(id: number){
    this.personService.Delete(id).subscribe(result => {
      this.modalRef?.hide();
      alert('Person deleted!');
      this.personService.List().subscribe(result => {
        this.people = result
      })
    })
  }

  SendForm(): void {
    const person : Person = this.form.value;

    if (person.id > 0) {
      this.personService.Update(person).subscribe((result) => {
        this.tableVisibility = true;
        this.formVisibility = false;
        alert('Person updated!');

        this.personService.List().subscribe(result => {
          this.people = result});
      });
    }

    this.personService.Create(person).subscribe((result) => {
      this.tableVisibility = true;
      this.formVisibility = false;
      alert('Person created!');

      this.personService.List().subscribe(result => {
        this.people = result});
    });
  }

  Back(): void {
    this.tableVisibility = true;
    this.formVisibility = false;
  }
}
