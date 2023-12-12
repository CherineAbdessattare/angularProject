import { Injectable } from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import { Departement } from '../model/departement.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLDep } from '../config';
import { DepartementWrapper } from '../model/DepartementWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  apiURL: string = 'http://localhost:8061/etudiants/api';
 apiURLDep: string = 'http://localhost:8061/etudiants/dep';

  //idEtudiant! : number;
  etudiant!:Etudiant;
  etudiants!:Etudiant[];
  departement!:any;
   //departements: Departement[];
  constructor(private http : HttpClient, private authService :AuthService) { 
    //console.log("Création de service etudiant ! ")
    // this.departements = [{idDepart : 1, nomDepart :"TI",DescriptionDepart:"Technologies de l'informatique"},
    // {idDepart : 2, nomDepart :"GM",DescriptionDepart:"Génie mécanique"}]
    // this.etudiants = [{idEtudiant:1, nom:'Cherine',prenom:'Abdessattare',parcours:'DSI',
    // email:'shirine073@gmail.com',dateInscription: new Date("01/15/2023"), departement :{idDepart : 1, nomDepart :"TI",DescriptionDepart:"Technologies de l'informatique"}},
    // {idEtudiant:2, nom:'Dalel',prenom:'Loussaief',parcours:'DSI',
    // email:'loussaiefdalel@gmail.com',dateInscription: new Date("01/20/2023"),departement :{idDepart : 1, nomDepart :"TI",DescriptionDepart:"Technologies de l'informatique"}},
    // {idEtudiant:3, nom:'Nour',prenom:'Garaali',parcours:'DSI',
    // email:'garaalinour@gmail.com',dateInscription: new Date("01/25/2023"),departement :{idDepart : 1, nomDepart :"TI",DescriptionDepart:"Technologies de l'informatique"}}];
  }

  listeEtudiant(): Observable<Etudiant[]>{
   /* let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Etudiant[]>(this.apiURL+"/all",{headers:httpHeaders});*/
    return this.http.get<Etudiant[]>(apiURL+"/all");
  }


  ajouterEtudiant( etud: Etudiant):Observable<Etudiant>
{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.post<Etudiant>(apiURL+"/addetud", etud, {headers:httpHeaders});
}

supprimerEtudiant( id : number){
  const url = `${apiURL}/deletud/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.delete(url, {headers:httpHeaders});

  }

  consulterEtudiant(id: number): Observable<Etudiant> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Etudiant>(url,{headers:httpHeaders});

    }
    

    updateEtudiant(etud :Etudiant) : Observable<Etudiant>
    {
       let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})  
      return this.http.put<Etudiant>(apiURL+"/updateetud", etud, {headers:httpHeaders});
      


    }
   
    listeDepartements():Observable<DepartementWrapper>{
      //return this.http.get<DepartementWrapper>(this.apiURLDep);
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<DepartementWrapper>(this.apiURLDep,{headers:httpHeaders});
    }
    
    rechercherParDepartement(idDepart: number):Observable< Etudiant[]> {
      const url = `${this.apiURL}/etudDepart/${idDepart}`;
      return this.http.get<Etudiant[]>(url);
    }

    rechercherParNom(nom: string):Observable< Etudiant[]> {
      const url = `${this.apiURL}/etudsByName/${nom}`;
      return this.http.get<Etudiant[]>(url);
      }

  ajouterDepartement(dep: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.apiURLDep, dep, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageEtud(file: File, filename: string, idEtudiant: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageEtud'}/${idEtudiant}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id : number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
    }
    
          
 

    
  
}
