import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {

  nomEtudiant!: string;
  etudiants!:Etudiant[];
  allEtudiants! : Etudiant[];
  searchTerm!: string;

  constructor( private etudiantService : EtudiantService) { }

  ngOnInit(): void {
    this.etudiantService.listeEtudiant().subscribe(etuds => {
      console.log(etuds);
      //this.allEtudiants = etuds;
      this.etudiants = etuds; // en utilise un pipe 
      });
  }

  rechercherEtuds(){
    this.etudiantService.rechercherParNom(this.nomEtudiant).subscribe(etuds => {this.etudiants = etuds; 
    console.log(etuds)});
    }

    onKeyUp(filterText : string){
      this.etudiants = this.allEtudiants.filter(item =>item.nom.toLowerCase().includes(filterText));
    }

}
