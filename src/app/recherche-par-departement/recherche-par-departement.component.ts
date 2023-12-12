import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Departement } from '../model/departement.model';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-recherche-par-departement',
  templateUrl: './recherche-par-departement.component.html',
 
})
export class RechercheParDepartementComponent implements OnInit {
  departements!: Departement[]; 
  IdDepart!:number;
  etudiants!:Etudiant[];
  constructor(private etudiantService : EtudiantService) { }

  ngOnInit(): void {
    this.etudiantService.listeDepartements().subscribe(deps => {this.departements = deps._embedded.departements;
console.log(deps); //remplir liste depart
});
  }

  onChange() {
    this.etudiantService.rechercherParDepartement(this.IdDepart).
    subscribe(etuds =>{this.etudiants=etuds});
    }

}
