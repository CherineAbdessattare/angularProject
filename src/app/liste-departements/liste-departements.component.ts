import { Component, Input, OnInit } from '@angular/core';
import { Departement } from '../model/departement.model';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-liste-departements',
  templateUrl: './liste-departements.component.html',
 })
export class ListeDepartementsComponent implements OnInit {

  departements! : Departement[];

  @Input()
  ajout:boolean= true;

  updatedDep:Departement= {"idDepart":0,"nomDepart":"","DescriptionDepart":""};
  constructor(private etudiantService : EtudiantService) { }

  ngOnInit(): void {
  this.etudiantService.listeDepartements().subscribe(deps => {this.departements = deps._embedded.departements;
  console.log(deps);
  //embedded contient le tableau depart 
  });

}
departementUpdated(dep:Departement){
  console.log("Departement updated event",dep);
  this.etudiantService.ajouterDepartement(dep).subscribe( ()=> this.chargerDepartements());
  }
  
  chargerDepartements(){
    this.etudiantService.listeDepartements().subscribe(deps => {this.departements =deps._embedded.departements;
    console.log(deps);
    });
    }

    updateDep(dep:Departement) {
      this.updatedDep=dep;
      this.ajout=false; 
      }
    

}
