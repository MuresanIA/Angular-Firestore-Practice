import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})
export class PersonsComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  private subscription: Subscription | any;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.subscription = this.personService
      .getPersons()
      .subscribe((persons: Person[]) => {
        console.log(persons);
        this.persons = persons;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
