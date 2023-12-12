import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Departement } from '../model/departement.model';

@Component({
  selector: 'app-update-departement',
  templateUrl: './update-departement.component.html',
})
export class UpdateDepartementComponent implements OnInit {
  @Input()
  departement! : Departement;

  @Input()
  ajout!:boolean;


  @Output() 
  departementUpdated = new EventEmitter<Departement>();
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateDepartement ",this.departement);
    }

    saveDepartement(){
      this.departementUpdated.emit(this.departement);
      }

}
