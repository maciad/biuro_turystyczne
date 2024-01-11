import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  // getCollection(collectionName: string) {
  //   return this.firestore.collection(collectionName).valueChanges();
  // }
  getCollection(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // getDocument(collectionName: string, documentId: string) {
  //   return this.firestore.collection(collectionName).doc(documentId).valueChanges();
  // }
  getDocument(collectionName: string, documentId: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(documentId).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as any;
        const id = a.payload.id;
        return { id, ...data };
      })
    );
  }

  updateDocument(collectionName: string, documentId: string, data: any) {
    return this.firestore.collection(collectionName).doc(documentId).update(data);
  }

  addDocument(collectionName: string, data: any) {
    return this.firestore.collection(collectionName).add(data);
  }
}
