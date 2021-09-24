import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private firestore: AngularFirestore) {}

  getPersons(): Observable<Person[]> {
    // return this.firestore.collection<Person>("persons").valueChanges();

    return this.firestore
      .collection<Person>('persons')
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      );
  }

  addPerson(person: Person): void {
    this.firestore.collection<Person>('persons').add(person);
  }

  getPerson(id: string): Observable<Person> {
    // return this.firestore
    //   .doc<Person>(`persons/${id}`)

    return this.firestore
      .collection<Person>('persons')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {
            return new Object() as Person;
          } else {
            const data = action.payload.data() as Person;
            data.id = action.payload.id;
            return data;
          }
        })
      );
  }

  updatePerson(person: Person, personId: string): void {
    this.firestore.collection<Person>('persons').doc(personId).update(person);
  }

  deletePerson(personId: string): void {
    this.firestore.doc<Person>(`persons/${personId}`).delete();
    // this.firestore.collection<Person>("persons").doc(personId).delete();
  }
}
