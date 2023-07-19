import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from '../person-model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {

  form: any;
  formTitle: string | undefined;

  constructor(private personService: PersonService) {}

  ngOnInit(): void{

    this.formTitle = 'New person'
    this.form = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null),
      age: new FormControl(null),
      occupation: new FormControl(null)
    });
  }

  SendForm(): void {
    const person : Person = this.form.value;

    this.personService.Create(person).subscribe((result) => {
      alert('Person created!');
    });
  }
}
