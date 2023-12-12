import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html'
})
export class EtudiantsComponent implements OnInit {
  apiURL: string = 'http://localhost:8061/etudiants/api';
  etudiants! : Etudiant[];
  etudiant!: Etudiant;
  constructor(private etudiantService: EtudiantService, public authService: AuthService,public router:Router) {
    this.etudiants = [];
  }

  ngOnInit(): void {
    this.chargerEtudiants();
  }

  chargerEtudiants() {
    this.etudiantService.listeEtudiant().subscribe(etuds => {
      console.log(etuds);
      this.etudiants = etuds;
      this.etudiants.forEach((etud) => {
        this.etudiantService.loadImage(etud.image.idImage).subscribe((img: Image) => {
          etud.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
      });
    });

   /*  this.etudiantService.listeEtudiant().subscribe(etuds =>{  this.etudiants = etuds;
      this.etudiants.forEach((etud)=> {
      etud.imageStr = 'data' + etud.images[0].type + ';base64' + etud.images[0].image;
      });
  })  */
  }
  supprimerEtudiant(e: Etudiant) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.etudiantService.supprimerEtudiant(e.idEtudiant).subscribe(() => {
    console.log("produit supprimé");
    this.chargerEtudiants();
      });
  }

  // supprimerEtudiant(e : Etudiant) {
  //   //console.log(e);
  //   let conf = confirm("Etes-vous sûr ?");
  //   if (conf)

  //   this.etudiantService.supprimerEtudiant(e);

  //   }

}
