import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class VegService {

  userList: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private ngFirestore: AngularFirestore) { }

  // Create
  createFarm(user: any) {
    return this.ngFirestore.collection('farm').add(user);
  }

  getData() {
    return this.ngFirestore.collection('farm').snapshotChanges();
  }

  // Update
  updateFarmDetail(getid, updatedata: any) {
    return this.ngFirestore.doc('farm/'+getid).update(updatedata);
  }

  // updateFarmRating(getid , updatedata:any)
  // Delete
  deleteFarm(delid) {
    return this.ngFirestore.doc('farm/'+delid).delete();
  }

  // Delete vegetables in vegetables array lists
  deleteVegetables(delid, veg) {
    return this.ngFirestore.doc(`'farm/'+${delid}+'/vegetables/0'`).delete();
  }
}
