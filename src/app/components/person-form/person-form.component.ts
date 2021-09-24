import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
})
export class PersonFormComponent implements OnInit {
  id: string = '';
  person: Person = {
    id: '',
    firstName: '',
    lastName: '',
    country: '',
    age: 0,
  };

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    console.log(this.id);

    if (this.id)
      this.personService
        .getPerson(this.id)
        .subscribe((person) => (this.person = person));
  }

  save(personForm: NgForm) {
    if (!personForm.valid) {
      console.log(personForm.valid);
      this.flashMessage.show('The form must be valid!', {cssClass: 'alert alert-danger', setTimeo: 5000});
    } else {
      if (this.id) {
        this.personService.updatePerson(personForm.value, this.id);
        this.flashMessage.show('Person updated!', {
          cssClass: 'alert alert-primary',
          setTimeout: 5000,
        });
      } else {
        this.personService.addPerson(personForm.value);
        this.flashMessage.show('A new person has been added!', {
          cssClass: 'alert alert-success',
          setTimeout: 5000,
        });
      }
      console.log(personForm.value);
      this.router.navigate(['/']);
    }
  }

  delete() {
    if (confirm('Are you sure you want to delete?')) {
      this.personService.deletePerson(this.id);
      this.flashMessage.show('Person has been deleted', {
        cssClass: 'alert alert-danger',
        setTimeout: 5000,
      });
      this.router.navigate(['/']);
    }
  }
}
