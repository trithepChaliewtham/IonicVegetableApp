import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Farm } from './farm';
import { FarmService } from './FarmService';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'dbservice.page.html',
  styleUrls: ['dbservice.page.scss'],
})

export class DbservicePage implements OnInit {
  stdobj: any;
  // searchTerm: string;
  constructor(private apiservice: FarmService, private alertCtrl: AlertController,
    private router: Router, private ngFirestore: AngularFirestore) { }

  ngOnInit() {
    this.apiservice.getData().subscribe((res) => {
      this.stdobj = res.map((t) => ({

          getid: t.payload.doc.id,
          name: t.payload.doc.data()['name'.toString()],
          address: t.payload.doc.data()['address'.toString()],
          popularVeg: t.payload.doc.data()['popularVeg'.toString()],
          rating: t.payload.doc.data()['rating'.toString()],
          avatarurl: t.payload.doc.data()['url'.toString()],

        }));
      // console.log(this.stdobj);
      });
    }//method

    async presentPromptAdd() {
      const alert = this.alertCtrl.create({
        header: 'Add',
        inputs: [
          {
            name: 'inputname',
            placeholder: 'Name'
          },
          {
            name: 'inputaddress',
            placeholder: 'Address'
          },
          {
            name: 'inputpopularVeg',
            placeholder: 'PopularVeg'
          },
          {
            name: 'inputrating',
            placeholder: 'Rating'
          },
          {
            name: 'inputurl',
            placeholder: 'Avatarurl'
          }
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
            text: 'Add',
            handler: data => {
              const tmpdata = {};
               tmpdata['name'.toString()] = data.inputname;
               tmpdata['address'.toString()] = data.inputaddress;
               tmpdata['popularVeg'.toString()] = data.inputpopularVeg;
               tmpdata['rating'.toString()] = data.inputrating;
               tmpdata['url'.toString()] = data.inputurl;
               console.log("Url input avatar : ",data.inputurl);
               this.apiservice.createFarm(tmpdata);
               console.log(tmpdata);
            }
          }
        ]
      });
      (await alert).present();
    }

    async presentConfirmDelete(delid: any) {
      const alert = this.alertCtrl.create({
        header: 'Delete', // Header
        message: 'Do you want to delete?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
            console.log('Cancel clicked');

              this.apiservice.deleteFarm(delid);
            }
          }
        ]
      });
      (await alert).present();
    }

    // Delete vegetables
    async presentConfirmDeleteVeg(delid: any, veg: any) {
      const alert = this.alertCtrl.create({
        header: 'Delete', // Header
        message: 'Do you want to delete?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
            console.log('Cancel clicked');
            console.log(delid , veg);
              this.apiservice.deleteVegetables(delid, veg);
            }
          }
        ]
      });
      (await alert).present();
    }

    // Update
      async presentPromptEdit(tmpobj) {
      const alert = this.alertCtrl.create({
        header: 'Edit',
        message: 'Edit : '+ tmpobj.name,
        
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
            name: 'popularVeg',
            placeholder: tmpobj.popularVeg,
            value: tmpobj.popularVeg
          },
          {
            name: 'rating',
            placeholder: tmpobj.rating,
            value: tmpobj.rating
          },
          {
            name: 'avatarurl',
            placeholder: tmpobj.avatarurl,
            value: tmpobj.avatarurl
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
               updatedata['popularVeg'.toString()] = data.popularVeg;
               updatedata['rating'.toString()] = data.rating;
               updatedata['url'.toString()] = data.avatarurl;
               this.apiservice.updateFarmDetail(tmpobj.getid, updatedata);
               console.log("This data will send to updated : ",updatedata);
               // console.log("Url update : ", data.avatarurl);
            }
          }
        ]
      });
      (await alert).present();
    }

    // update rating pressed up
    async pressStarRatingUp(tmpobj){
      const updatedata = {};
      updatedata['name'.toString()] = tmpobj.name;
      updatedata['address'.toString()] = tmpobj.address;
      updatedata['popularVeg'.toString()] = tmpobj.popularVeg;
      updatedata['rating'.toString()] = (parseInt(tmpobj.rating) + 1).toString();

      updatedata['url'.toString()] = tmpobj.avatarurl;
      this.apiservice.updateFarmDetail(tmpobj.getid, updatedata);
        //    console.log("Update rating : ",updatedata);
    }

    // update rating pressed down
    async pressStarRatingDown(tmpobj){
      const updatedata = {};
      updatedata['name'.toString()] = tmpobj.name;
      updatedata['address'.toString()] = tmpobj.address;
      updatedata['popularVeg'.toString()] = tmpobj.popularVeg;
      updatedata['rating'.toString()] = (parseInt(tmpobj.rating) - 1).toString();

      updatedata['url'.toString()] = tmpobj.avatarurl;
      this.apiservice.updateFarmDetail(tmpobj.getid, updatedata);
    }

}//class
