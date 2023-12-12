import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';
import { Departement } from '../model/departement.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
})
export class AddEtudiantComponent implements OnInit {
  newEtudiant = new Etudiant();
  message: string | undefined ;
  departements!: Departement[];
  newIdDepart!: number;
  newDepartement!: Departement;
  uploadedImage!: File;
  imagePath: any;
  constructor(private etudiantService : EtudiantService,
    private router : Router) { }

  ngOnInit(): void {
    this.etudiantService.listeDepartements().subscribe(deps => {console.log(deps);
this.departements = deps._embedded.departements;
}
);
  }

//   addEtudiant(){
//     this.newEtudiant.departement = this.departements.find(dep => dep.idDepart == this.newIdDepart)!;
//     this.etudiantService.ajouterEtudiant(this.newEtudiant).subscribe(etud => {
//       console.log(etud);
//       this.router.navigate(['etudiants']);
// });
//   }

addEtudiant(){
  // this.etudiantService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img: Image) => {
  // this.newEtudiant.image=img;
  // this.newEtudiant.departement = this.departements.find(dep => dep.idDepart == this.newIdDepart)!;
  // this.etudiantService.ajouterEtudiant(this.newEtudiant).subscribe(() => {
  // this.router.navigate(['etudiants']);
  // });
  // });


  this.newEtudiant.departement = this.departements.find((v: any) => this.newIdDepart == this.newIdDepart)!;
  this.etudiantService.ajouterEtudiant(this.newEtudiant).subscribe((createEtudiant: Etudiant) => {
    this.newEtudiant = createEtudiant;
    this.etudiantService.uploadImageEtud(this.uploadedImage, this.uploadedImage.name, this.newEtudiant.idEtudiant).subscribe((img: Image) => {
      this.newEtudiant.image = img;
      this.etudiantService.updateEtudiant(this.newEtudiant).subscribe(() => {
        this.router.navigate(['etudiants']);
      })
    })
  })
  }
  

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }
}
