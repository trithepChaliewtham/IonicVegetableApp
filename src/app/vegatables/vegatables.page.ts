import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
// import { Veg } from './veg';
import { VegService } from './VegService';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'vegatables.page.html',
  styleUrls: ['vegatables.page.scss'],
})

export class VegatablesPage implements OnInit {
  stdobj: any;
  // searchTerm: string;
  constructor(private apiservice: VegService, private alertCtrl: AlertController,
    private router: Router, private ngFirestore: AngularFirestore) { }

  ngOnInit() {
    console.log("VegService :" , this.apiservice , typeof this.apiservice);
    // this.apiservice.ref();
    this.apiservice.getData().subscribe((res) => {
      console.log("Res is : ", res);
      this.stdobj = res.map((t) => ({
          // getid: t.payload.doc.id,
          name: t.payload.doc.data()['name'.toString()],
          // address: t.payload.doc.data()['address'.toString()],
          popularVeg: t.payload.doc.data()['popularVeg'.toString()],
          url: t.payload.doc.data()['url'.toString()]
        }));
        console.log("Vegetables page obj : ",this.stdobj);
      });
    }//method

    
    // Update
      async presentPromptEdit(tmpobj) {
      const alert = this.alertCtrl.create({
        header: 'Edit',
        message: 'Now you are editing '+name,
        
        inputs: [
          {
            name: 'name',
            placeholder: tmpobj.name,
            value: tmpobj.name
          },
          {
            name: 'address',
            placeholder: tmpobj.address,
            value: tmpobj.address
          },
          {
            name: 'vegetables',
            placeholder:tmpobj.vegetables,
            value: tmpobj.vegetables
          },
         
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Update',
            handler: data => {
              const updatedata = {};
               updatedata['name'.toString()] = data.name;
               updatedata['address'.toString()] = data.address;
               this.apiservice.updateFarmDetail(tmpobj.getid, updatedata);
               console.log(updatedata);
            }
          }
        ]
      });
      (await alert).present();
    }


}//class
